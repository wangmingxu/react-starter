import React from 'react';
import '../styles/audio.less';
import Logo from 'Component/Logo';
import ActivityDetail from 'Component/ActivityDetail';
import ReactSwipe from 'react-swipe';
import Letter from 'Component/Letter';
import classNames from 'classnames';
import player from 'utils/audioPlayer';
// import { Toast } from 'antd-mobile';
import OnePage from 'Hoc/onePage';
import { kolMap } from 'constant';

class Kol extends React.Component {
  componentDidMount() {
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }
  componentWillUnmount() {
    player.pause();
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }
  onVisibilityChange = () => {
    if (document.hidden) {
      player.pause();
    } else {
      // 页面呼出
    }
  }
  swipeRef = null;
  navToRecord = () => {
    const { history } = this.props;
    const method = window.platform === 'IPhone' && window.isWX ? 'replace' : 'push';
    history[method]('/record');
  }
  handleSlide = (i) => {
    // if (player.paused) return;
    // player.src = kolMap[i].audio;
    // try {
    //   Toast.info('正在加载音频...');
    //   await player.play();
    //   Toast.hide();
    // } catch (error) {
    //   console.log(error);
    // }
  }
  prev = () => {
    try {
      this.swipeRef.prev();
    } catch (error) {
      console.log(error);
    }
  }
  next = () => {
    this.swipeRef.next();
  }
  render() {
    return (
      <React.Fragment>
        <ReactSwipe
          ref={(e) => { this.swipeRef = e; }}
          swipeOptions={{ continuous: true, callback: this.handleSlide }}
          style={{
            container: {
              height: '100%',
              overflow: 'hidden',
              visibility: 'hidden',
              position: 'relative',
            },
            wrapper: {
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
            },
            child: {
              float: 'left',
              width: '100%',
              position: 'relative',
              transitionProperty: 'transform',
            },
          }}
        >
          {kolMap.map((item, i) => (
            <div styleName={classNames('audio-page', `theme${item.theme}`)} key={i}>
              <OnePage render={({ scale }) => (
                <div className="onePage" style={{ transform: `scale(${scale})` }}>
                  <Letter audioInfo={item} displayType="dom" usefor="kol" />
                  <div styleName="btn-record" onClick={this.navToRecord} />
                </div>
              )}
              />
            </div>
          ))}
        </ReactSwipe>
        <Logo />
        <ActivityDetail />
        <div styleName="btn-tab prev" onClick={this.prev} />
        <div styleName="btn-tab next" onClick={this.next} />
        <div styleName="tip-swipe" />
      </React.Fragment>
    );
  }
}

export default Kol;
