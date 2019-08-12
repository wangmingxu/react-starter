import React from 'react';
import '../styles/voice.less';
import Player, { AudioStatus, EventMap } from '@lz-component/Player';
import api from 'utils/api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mineActions from 'Action/Mine';
import { showShareOverlay } from '@lz-component/ShareOverlay';
import { withUserAgent } from 'rc-useragent';
import { WithLoginBtn } from 'Hoc/WithLogin';
import { showDownloadDialog } from '@lz-component/DownloadDialog';
import { defaultAvatar } from 'constant';
import { Toast } from 'antd-mobile';

@connect(
  state => ({ mine: state.Mine }),
  dispatch => bindActionCreators(mineActions, dispatch),
)
@withUserAgent
class Voice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: AudioStatus.WAIT_PLAY,
      voiceInfo: {},
    };
    this.player = null;
  }
  get activityId() {
    const { location } = this.props;
    const params = new URLSearchParams(location.search);
    return params.get('activityId');
  }
  async componentDidMount() {
    this.player = Player.getInstance();
    await this.loadVoiceInfo();
    this.player.on(EventMap.STATUS_CHANGE, this.handleStatus);
    Object.assign(window.shareData, {
      url: `${location.origin}${location.pathname}#/voice/${this.voiceId}?activityId=${
        this.activityId
      }`,
      link: `${location.origin}${location.pathname}#/voice/${this.voiceId}?activityId=${
        this.activityId
      }`,
    });
  }
  componentWillUnmount() {
    this.player.off(EventMap.STATUS_CHANGE, this.handleStatus);
    this.player.pause();
  }
  get voiceId() {
    const {
      match: { params },
    } = this.props;
    return params.id;
  }
  loadVoiceInfo = async () => {
    Toast.loading('', 0);
    try {
      const { data } = await api.audioInfo({ audioId: this.voiceId, activityId: this.activityId });
      this.setState({ voiceInfo: data });
    } catch (error) {
      console.log(error);
    } finally {
      Toast.hide();
    }
  };
  play = () => {
    if (!this.state.voiceInfo.file) {
      Toast.info('该节目违规，已被删除');
    } else {
      this.player.setAudioSrc(this.state.voiceInfo.file, true);
    }
  };
  pause = () => {
    this.player.pause();
  };
  handleStatus = (status) => {
    this.setState({ status });
  };
  vote = async () => {
    try {
      await api.vote({
        activityId: this.activityId,
        audioId: this.state.voiceInfo.id,
      });
      Toast.info('投票成功', 1.5);
      this.loadVoiceInfo();
      this.props.loadMineInfo();
    } catch (error) {
      Toast.info(error);
    }
  };
  share = async () => {
    const { ua } = this.props;
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
  render() {
    const { status, voiceInfo } = this.state;
    const { ua } = this.props;
    return (
      <div styleName="voice-page">
        <div styleName="main">
          <div styleName="panl">
            <div styleName="avatar-wrapper">
              <img styleName="avatar" src={voiceInfo.coverThumb || defaultAvatar} alt="avatar" />
              {status === AudioStatus.PLAYING ? (
                <div styleName="btn-control pause" onClick={this.pause} />
              ) : (
                <div styleName="btn-control play" onClick={this.play} />
              )}
            </div>
            <div styleName="info">
              <div styleName="title">{voiceInfo.name}</div>
              <div styleName="votes">
                目前得票数：
                {voiceInfo.vote}
              </div>
              <div styleName="rank">
                排名：
                {voiceInfo.rank}
              </div>
            </div>
          </div>
          <div styleName="operation">
            <div styleName="btn share" onClick={this.share}>
              拉票
            </div>
            {ua.isLizhiFM || ua.isWeiXin ? (
              <WithLoginBtn
                render={() => (
                  <div styleName="btn vote" onClick={this.vote}>
                    投票
                  </div>
                )}
              />
            ) : (
              <div styleName="btn vote" onClick={this.downloadApp}>
                投票
              </div>
            )}
          </div>
        </div>
        {/* <Link styleName="btn-back" to="/">回到首页</Link> */}
      </div>
    );
  }
}
export default Voice;
