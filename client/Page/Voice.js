import React from 'react';
import Banner from 'Component/Banner';
import '../styles/voice.less';
import Player, { AudioStatus, EventMap } from 'Component/Player';
import { showVoteDialog } from 'Component/VoteDialog';
import api from 'utils/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mineActions from 'Action/Mine';
import { showShareOverlay } from '@lz-component/ShareOverlay';
import { withUserAgent } from 'rc-useragent';

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
    this.player = Player.getInstance();
  }
  async componentDidMount() {
    await this.loadVoiceInfo();
    this.player.on(EventMap.STATUS_CHANGE, this.handleStatus);
    await this.player.setAudioSrc('http://cdn5.lizhi.fm/audio/2018/02/15/2653140969335672326_hd.mp3', false);
    // setTimeout(() => {
    //   this.player.setAudioSrc('http://cdn5.lizhi.fm/audio/2017/05/26/2603966825752803846_hd.mp3');
    // }, 5000);
  }
  componentWillUnmount() {
    this.player.destroy();
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
    this.player.play();
  }
  pause = () => {
    this.player.pause();
  }
  handleStatus = (status) => {
    this.setState({ status });
  }
  vote = async () => {
    await new Promise((resolve) => {
      showVoteDialog({
        restVote: this.props.mine.myVotes,
        onVoteSuccess: resolve,
      });
    });
    this.loadVoiceInfo();
    this.props.loadMineInfo();
  }
  share = async () => {
    const { ua } = this.props;
    if (ua.isLizhiFM) {
      lz.shareUrl({
        url: location.href,
        title: window.shareData.title,
        desc: window.shareData.desc, // 分享的描述
        'image-url': window.shareData.imgUrl, // 分享的图片
      });
      await new Promise((resolve, reject) => {
        lz.on('shareFinish', (ret) => {
          if (ret.statusCode === 0) {
            resolve();
          } else {
            reject();
          }
        });
      });
      await api.getShareVote({}, { needAuth: true });
      this.props.loadMineInfo();
    } else {
      showShareOverlay();
    }
  }
  render() {
    const { status, voiceInfo } = this.state;
    return (
      <div styleName="voice-page">
        <Banner logo detail />
        <div styleName="panl">
          <div styleName="panl-title">
            <div styleName="avatar-wrapper">
              <img
                styleName="avatar"
                src={voiceInfo.image}
                alt="avatar"
              />
              {status === AudioStatus.PLAYING ? <div styleName="btn-control pause" onClick={this.pause} /> : <div styleName="btn-control play" onClick={this.play} />}
            </div>
            <div styleName="nickname">{voiceInfo.nickName}</div>
          </div>
          <div styleName="panl-content">
            <div styleName="row">{voiceInfo.title}</div>
            <div styleName="row">
              <div styleName="cl1">{voiceInfo.schoolName}</div>
              <div styleName="cl2">总榜排名：{voiceInfo.rank}</div>
            </div>
            <div styleName="row">
              <div styleName="cl1">新声值：{voiceInfo.votes}</div>
              <div styleName="cl2">同校排名：{voiceInfo.schoolRank}</div>
            </div>
            <div styleName="row">
              <div styleName="cl1">
                <div styleName="btn btn-vote" onClick={this.vote}>贡献</div>
              </div>
              <div styleName="cl2">
                <div styleName="btn btn-share" onClick={this.share}>转发</div>
              </div>
            </div>
          </div>
        </div>
        <div styleName="btn-back">回到首页</div>
      </div>
    );
  }
}
export default Voice;
