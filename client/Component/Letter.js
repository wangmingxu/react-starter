import React from 'react';
import '../styles/letter.less';
import classNames from 'classnames';
import Star from 'assets/loveletter/star.png';
import { playBtnArr, starArr } from 'constant';
import { Toast } from 'antd-mobile';
import player from 'utils/audioPlayer';

class Letter extends React.Component {
  state = {
    // status: playStatus.WAIT_PLAY,
  }
  componentDidMount() {
    // player.addEventListener('ended', this.onAudioPlayEnd);
  }
  componentWillUnmount() {
    // player.removeEventListener('ended', this.onAudioPlayEnd);
  }
  // onAudioPlayEnd = () => {
  //   this.setState({ status: playStatus.WAIT_PLAY });
  // }
  play = async (e) => {
    e && e.stopPropagation();
    Toast.info('正在加载音频...');
    player.src = this.props.audioInfo.audioUrl;
    await player.play();
    // this.setState({ status: playStatus.PLAYING });
    Toast.hide();
  }
  pause = (e) => {
    e && e.stopPropagation();
    player.pause();
    // this.setState({ status: playStatus.PAUSE });
  }
  render() {
    const { theme, audioInfo } = this.props;
    return (
      <div styleName={classNames('book', `theme${theme}`)}>
        <img
          src="https://h5.lizhi.fm/static/voicereport/common/3.png"
          styleName="avatar"
          alt="avatar"
        />
        <div styleName="nickName">XXXX</div>
        <img styleName="btn-play" src={playBtnArr[theme - 1]} alt="play" onClick={this.play} />
        <div styleName="card">
          <div dangerouslySetInnerHTML={{ __html: audioInfo.text }} />
          <div styleName="defeat">你的声音情书已经成功撩了<span styleName="num">8888</span>个人</div>
        </div>
        <div styleName="voice-index">
          <div styleName="item">
            <div styleName="label">撩人指数：</div>
            <div styleName="val">
              <img src={starArr[theme - 1]} alt="star" styleName="star active" />
              <img src={starArr[theme - 1]} alt="star" styleName="star active" />
              <img src={starArr[theme - 1]} alt="star" styleName="star active" />
              <img src={starArr[theme - 1]} alt="star" styleName="star active" />
              <img src={Star} alt="star" styleName="star" />
            </div>
          </div>
          <div styleName="item">
            <div styleName="label">催泪指数：</div>
            <div styleName="val">
              <img src={starArr[theme - 1]} alt="star" styleName="star active" />
              <img src={starArr[theme - 1]} alt="star" styleName="star active" />
              <img src={starArr[theme - 1]} alt="star" styleName="star active" />
              <img src={starArr[theme - 1]} alt="star" styleName="star active" />
              <img src={Star} alt="star" styleName="star" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Letter;
