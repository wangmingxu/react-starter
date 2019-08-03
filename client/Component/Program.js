import React from 'react';
import { showShareOverlay } from '@lz-component/ShareOverlay';
import '../styles/program.less';
import { withUserAgent } from 'rc-useragent';
import { WithLoginBtn } from 'Hoc/WithLogin';
import { showDownloadDialog } from '@lz-component/DownloadDialog';
import { ProgramType, getPersonShareData, getSchoolShareData } from 'constant';
import classNames from 'classnames';
import * as mineActions from 'Action/Mine';
import { showVoteDialog } from 'Component/VoteDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stopPropagation } from 'utils/domHelper';
import Player, { EventMap, AudioStatus } from '@lz-component/Player';
import { withRouter } from 'react-router';
import { Toast } from 'antd-mobile';
import throttle from 'lodash/throttle';

@connect(
  state => ({ mine: state.Mine }),
  dispatch => bindActionCreators(mineActions, dispatch)
)
@withUserAgent
@withRouter
class Program extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: AudioStatus.WAIT_PLAY,
      playId: -1,
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
    if (this.state.playId === this.props.data.aid) this.player.pause();
  }
  handlePlayerStatus = status => {
    this.setState({ playStatus: status });
  };
  handlePlayIdChange = id => {
    this.setState({ playId: id });
  };
  play = throttle(() => {
    const { data } = this.props;
    if (!data.file) {
      Toast.info('该节目违规，已被删除', 1);
    } else {
      this.player.setAudioSrc(data.file);
      this.player.emit('playIdChange', data.aid);
    }
  }, 1000);
  handlePlayerError = error => {
    const { playId } = this.state;
    const { data } = this.props;
    playId === data.aid && console.log(error);
  };
  pause = throttle(() => {
    this.player.pause();
  }, 1000);
  share = async () => {
    const { ua, type, data } = this.props;
    if (ua.isLizhiFM) {
      const shareData = type === ProgramType.PERSONAL
        ? getPersonShareData(data.id)
        : getSchoolShareData(data.id);
      lz.shareUrl(shareData).then(ret => {
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
  vote = async () => {
    const votes = await new Promise((resolve, reject) => {
      showVoteDialog({
        id: this.props.data.id,
        type: this.props.type,
        restVote: this.props.mine.myVotes,
        onVoteSuccess: resolve,
        onCancel: reject,
      });
    });
    this.props.onVote(this.props.data.id, votes);
    this.props.loadMineInfo();
  };
  gotoVoicePage = () => {
    const { history, data } = this.props;
    history.push(`/voice/${data.id}`);
  };
  render() {
    const { style, className, ua, data } = this.props;
    const { playStatus, playId } = this.state;
    return (
      <div
        styleName="program-item"
        style={style}
        className={className}
        onClick={this.gotoVoicePage}
      >
        <div styleName="avatar-wrapper">
          <img styleName="avatar" alt="avatar" src={data.coverThumb} />
          {playStatus === AudioStatus.PLAYING && playId === data.aid
            ? <div
              styleName="btn-control pause"
              onClick={stopPropagation(this.pause)}
            />
            : <div
              styleName="btn-control play"
              onClick={stopPropagation(this.play)}
            />}
        </div>
        <div styleName="info">
          <div styleName="name">{data.name}</div>
          <div styleName="votes">
            {data.vote}票
          </div>
          <div styleName="operation">
            {ua.isLizhiFM
              ? <WithLoginBtn
                render={() => (
                  <div
                    styleName="btn btn-vote"
                    onClick={stopPropagation(this.vote)}
                  >
                    投票
                    </div>
                )}
              />
              : <div
                styleName="btn btn-vote"
                onClick={stopPropagation(this.downloadApp)}
              >
                投票
                </div>}
            <div
              styleName="btn btn-share"
              onClick={stopPropagation(this.share)}
            >
              拉票
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Program;
