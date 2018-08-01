import React from 'react';
import '../styles/letter.less';
import classNames from 'classnames';
import Star from 'assets/loveletter/star.png';
import { playBtnArr, starArr, letterText } from 'constant';
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
    player.src = this.props.audioInfo.audio;
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
    const { audioInfo } = this.props;
    return (
      <div styleName={classNames('book', `theme${audioInfo.theme}`)}>
        <img
          src={audioInfo.image}
          styleName="avatar"
          alt="avatar"
        />
        <div styleName="nickName">{audioInfo.nickName}</div>
        <img styleName="btn-play" src={playBtnArr[audioInfo.theme - 1]} alt="play" onClick={this.play} />
        <div styleName="card">
          {'textId' in audioInfo ? <div dangerouslySetInnerHTML={{ __html: letterText[audioInfo.textId].text }} /> : null}
          <div styleName="defeat">你的声音情书已经成功撩了<span styleName="num">{(`${audioInfo.num}`).padStart(4, '0')}</span>个人</div>
        </div>
        <div styleName="voice-index">
          <div styleName="item">
            <div styleName="label">撩人指数：</div>
            <div styleName="val">
              {audioInfo.lrNum > 0 ? Array(audioInfo.lrNum).fill(0).map((item, i) => (
                <img src={starArr[audioInfo.theme - 1]} alt="star" styleName="star active" key={i} />
              )) : null}
              {5 - audioInfo.lrNum > 0 ? Array(5 - audioInfo.lrNum).fill(0).map((item, i) => (
                <img src={Star} alt="star" styleName="star" key={i} />
              )) : null}
            </div>
          </div>
          <div styleName="item">
            <div styleName="label">催泪指数：</div>
            <div styleName="val">
              {audioInfo.clNum > 0 ? Array(audioInfo.clNum).fill(0).map((item, i) => (
                <img src={starArr[audioInfo.theme - 1]} alt="star" styleName="star active" key={i} />
              )) : null}
              {5 - audioInfo.clNum > 0 ? Array(5 - audioInfo.clNum).fill(0).map((item, i) => (
                <img src={Star} alt="star" styleName="star" key={i} />
              )) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Letter;
