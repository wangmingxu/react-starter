import React from 'react';
import Banner from 'Component/Banner';
import '../styles/voice.less';
import Player, { AudioStatus, EventMap } from 'Component/Player';
import VoteDialog from 'Component/VoteDialog';

class Voice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: AudioStatus.WAIT_PLAY,
    };
    this.player = Player.getInstance();
  }
  async componentDidMount() {
    this.player.on(EventMap.STATUS_CHANGE, this.handleStatus);
    await this.player.setAudioSrc('http://cdn5.lizhi.fm/audio/2018/02/15/2653140969335672326_hd.mp3', false);
    // setTimeout(() => {
    //   this.player.setAudioSrc('http://cdn5.lizhi.fm/audio/2017/05/26/2603966825752803846_hd.mp3');
    // }, 5000);
  }
  componentWillUnmount() {
    this.player.destroy();
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
  render() {
    const { status } = this.state;
    return (
      <div styleName="voice-page">
        <Banner logo detail />
        {/* <VoteDialog /> */}
        <div styleName="panl">
          <div styleName="panl-title">
            <div styleName="avatar-wrapper">
              <img
                styleName="avatar"
                src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0"
                alt="avatar"
              />
              {status === AudioStatus.PLAYING ? <div styleName="btn-control pause" onClick={this.pause} /> : <div styleName="btn-control play" onClick={this.play} />}
            </div>
            <div styleName="nickname">橘子哥哥</div>
          </div>
          <div styleName="panl-content">
            <div styleName="row">开学第一天，军训真热</div>
            <div styleName="row">
              <div styleName="cl1">四川大学</div>
              <div styleName="cl2">总榜排名：20</div>
            </div>
            <div styleName="row">
              <div styleName="cl1">新声值：53244</div>
              <div styleName="cl2">同校排名：5</div>
            </div>
            <div styleName="row">
              <div styleName="cl1">
                <div styleName="btn btn-vote">贡献</div>
              </div>
              <div styleName="cl2">
                <div styleName="btn btn-share">转发</div>
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
