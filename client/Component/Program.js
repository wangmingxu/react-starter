import React from 'react';
import { showShareOverlay } from '@lz-component/ShareOverlay';
import '../styles/program.less';
import { withUserAgent } from 'rc-useragent';
import { WithLoginBtn } from 'Hoc/WithLogin';
import { showDownloadDialog } from '@lz-component/DownloadDialog';
import classNames from 'classnames';
import * as mineActions from 'Action/Mine';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stopPropagation } from 'utils/domHelper';
import Player, { EventMap, AudioStatus } from '@lz-component/Player';
import { withRouter } from 'react-router';
import { Toast } from 'antd-mobile';
import throttle from 'lodash/throttle';
import api from 'utils/api';

@connect(
  state => ({ mine: state.Mine }),
  dispatch => bindActionCreators(mineActions, dispatch),
)
@withUserAgent
@withRouter
class Program extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: AudioStatus.WAIT_PLAY,
      playId: -1,
      isAdding: false,
    };
    this.player = null;
  }
  componentDidMount() {
    this.player = Player.getInstance();
    this.player.on(EventMap.STATUS_CHANGE, this.handlePlayerStatus);
    this.player.on(EventMap.ERROR, this.handlePlayerError);
    this.player.on('playIdChange', this.handlePlayIdChange);
  }
  componentWillUnmount() {
    this.player.off(EventMap.STATUS_CHANGE, this.handlePlayerStatus);
    this.player.off(EventMap.ERROR, this.handlePlayerError);
    this.player.off('playIdChange', this.handlePlayIdChange);
    if (this.state.playId === this.props.data.id) this.player.pause();
  }
  handlePlayerStatus = (status) => {
    this.setState({ playStatus: status });
  };
  handlePlayIdChange = (id) => {
    console.log(id);
    this.setState({ playId: id });
  };
  play = throttle(
    () => {
      const { data } = this.props;
      console.log(data);
      if (!data.file) {
        Toast.info('该节目违规，已被删除', 1);
      } else {
        this.player.setAudioSrc(data.file);
        this.player.emit('playIdChange', data.id);
      }
    },
    1000,
    { trailing: false },
  );
  handlePlayerError = (error) => {
    const { playId } = this.state;
    const { data } = this.props;
    playId === data.id && console.log(error);
  };
  pause = throttle(() => {
    this.player.pause();
  }, 1000);
  share = async () => {
    const { ua, data } = this.props;
    Object.assign(window.shareData, {
      url: `${location.origin}${location.pathname}#/voice/${data.id}?activityId=${data.aid}`,
      link: `${location.origin}${location.pathname}#/voice/${data.id}?activityId=${data.aid}`,
    });
    if (ua.isLizhiFM) {
      lz.shareUrl(window.shareData).then((ret) => {
        ret.status !== 'success' && lz.alt(ret);
      });
    } else {
      showShareOverlay();
    }
  };
  downloadApp = () => {
    showDownloadDialog({
      type: 7,
      url: location.href,
    });
  };
  vote = throttle(
    async () => {
      const { data } = this.props;
      try {
        await api.vote({
          activityId: data.aid,
          audioId: data.id,
        });
        this.setState({ isAdding: true });
        this.props.onVote();
        this.props.loadMineInfo();
      } catch (error) {
        console.log(error);
        Toast.info(error);
      }
    },
    1000,
    { trailing: false },
  );
  gotoVoicePage = () => {
    const { history, data } = this.props;
    sessionStorage.setItem('restoreScroll', true)
    history.push(`/voice/${data.id}?activityId=${data.aid}`);
  };
  render() {
    const {
      style, className, ua, data,
    } = this.props;
    const { playStatus, playId, isAdding } = this.state;
    return (
      <div
        styleName="program-item"
        style={style}
        className={className}
        onClick={this.gotoVoicePage}
      >
        <div styleName="avatar-wrapper">
          <img styleName="avatar" alt="avatar" src={data.coverThumb} />
          {playStatus === AudioStatus.PLAYING && playId === data.id ? (
            <div styleName="btn-control pause" onClick={stopPropagation(this.pause)} />
          ) : (
            <div styleName="btn-control play" onClick={stopPropagation(this.play)} />
          )}
        </div>
        <div styleName="info">
          <div styleName="name">{data.name}</div>
          <div styleName="votes">
            {data.vote}票
            {isAdding && (
              <span styleName="add" onAnimationEnd={() => this.setState({ isAdding: false })}>
                +1
              </span>
            )}
          </div>
          <div styleName="operation">
            {ua.isLizhiFM || ua.isWeiXin ? (
              <WithLoginBtn
                render={() => (
                  <div styleName="btn btn-vote" onClick={stopPropagation(this.vote)}>
                    投票
                  </div>
                )}
              />
            ) : (
              <div styleName="btn btn-vote" onClick={stopPropagation(this.downloadApp)}>
                投票
              </div>
            )}
            <div styleName="btn btn-share" onClick={stopPropagation(this.share)}>
              拉票
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Program;
