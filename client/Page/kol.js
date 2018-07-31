import React from 'react';
import '../styles/audio.less';
import Logo from 'Component/Logo';
import ActivityDetail from 'Component/ActivityDetail';
import ReactSwipe from 'react-swipe';
import Letter from 'Component/Letter';
import classNames from 'classnames';
import player from 'utils/audioPlayer';
import { Toast } from 'antd-mobile';
import OnePage from 'Hoc/onePage';
import { kolMap } from 'constant';

class Kol extends React.Component {
  componentWillUnmount() {
    player.pause();
  }
  swipeRef = null;
  navToRecord = () => {
    const { history } = this.props;
    history.push('/record');
  }
  handleSlide = (i) => {
    player.src = kolMap[i].audioUrl;
    try {
      Toast.info('正在加载音频...');
      player.play();
      Toast.hide();
    } catch (error) {
      window.alert(error);
    }
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
            <div styleName={classNames('audio-page', `theme${i % 4 + 1}`)} key={i}>
              <OnePage render={({ scale }) => (
                <div className="onePage" style={{ transform: `scale(${scale})` }}>
                  <Letter theme={i % 4 + 1} audioInfo={item} />
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
