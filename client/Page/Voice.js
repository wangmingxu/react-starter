import React from 'react';
import '../styles/voice.less';
import Player, { AudioStatus, EventMap } from '@lz-component/Player';
import { showVoteDialog } from 'Component/VoteDialog';
import api from 'utils/api';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mineActions from 'Action/Mine';
import { showShareOverlay } from '@lz-component/ShareOverlay';
import { withUserAgent } from 'rc-useragent';
import { WithLoginBtn } from 'Hoc/WithLogin';
import { showDownloadDialog } from '@lz-component/DownloadDialog';
import { getPersonShareData, ProgramType, defaultAvatar } from 'constant';
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
  async componentDidMount() {
    this.player = Player.getInstance();
    await this.loadVoiceInfo();
    this.player.on(EventMap.STATUS_CHANGE, this.handleStatus);
  }
  componentWillUnmount() {
    this.player.off(EventMap.STATUS_CHANGE, this.handleStatus);
    this.player.pause();
  }
  get voiceId() {
    const { match: { params } } = this.props;
    return params.id;
  }
  loadVoiceInfo = async () => {
    const { data } = await api.audioInfo({ id: this.voiceId });
    this.setState({ voiceInfo: data });
  }
  play = () => {
    if (!this.state.voiceInfo.audio) {
      Toast.info('该节目违规，已被删除');
    } else {
      this.player.setAudioSrc(this.state.voiceInfo.audio, true);
    }
  }
  pause = () => {
    this.player.pause();
  }
  handleStatus = (status) => {
    this.setState({ status });
  }
  vote = async () => {
    await new Promise((resolve, reject) => {
      showVoteDialog({
        id: this.voiceId,
        type: ProgramType.PERSONAL,
        restVote: this.props.mine.myVotes,
        onVoteSuccess: resolve,
        onCancel: reject,
      });
    });
    this.loadVoiceInfo();
    this.props.loadMineInfo();
  }
  share = async () => {
    const { ua } = this.props;
    if (ua.isLizhiFM) {
      const shareData = getPersonShareData(this.voiceId);
      lz.shareUrl(shareData).then((ret) => {
        ret.status !== 'success' && lz.alt(ret);
      });
    } else {
      showShareOverlay();
    }
  }
  downloadApp = () => {
    showDownloadDialog({
      type: 7,
      url: location.href,
    });
  }
  render() {
    const { status, voiceInfo } = this.state;
    const { ua } = this.props;
    return (
      <div styleName="voice-page">
        <div styleName="main">
          <div styleName="panl">
            <div styleName="avatar-wrapper">
              <img
                styleName="avatar"
                src={voiceInfo.image || defaultAvatar}
                alt="avatar"
              />
              {status === AudioStatus.PLAYING ? <div styleName="btn-control pause" onClick={this.pause} /> : <div styleName="btn-control play" onClick={this.play} />}
            </div>
            <div styleName="info">
              <div styleName="title">{voiceInfo.title}</div>
              <div styleName="votes">目前得票数：{voiceInfo.votes}</div>
              <div styleName="rank">排名：{voiceInfo.rank}</div>
            </div>
          </div>
          <div styleName="operation">
            <div styleName="btn share" onClick={this.share}>拉票</div>
            {ua.isLizhiFM ?
              <WithLoginBtn render={() => <div styleName="btn vote" onClick={this.vote}>投票</div>} /> :
              <div styleName="btn vote" onClick={this.downloadApp}>投票</div>}
          </div>
        </div>
        {/* <Link styleName="btn-back" to="/">回到首页</Link> */}
      </div>
    );
  }
}
export default Voice;
