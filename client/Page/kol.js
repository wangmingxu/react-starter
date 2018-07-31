import React from 'react';
import '../styles/audio.less';
import Logo from 'Component/Logo';
import ActivityDetail from 'Component/ActivityDetail';
import ReactSwipe from 'react-swipe';
import Letter from 'Component/Letter';
import classNames from 'classnames';

const PlayStatus = {
  WAIT_PLAY: 1,
  PAUSE: 2,
  PLAYING: 3,
};

class Kol extends React.Component {
  state = {
    status: PlayStatus.WAIT_PLAY,
  }
  componentDidMount() {
    this.player = new Audio();
    this.player.addEventListener('ended', this.onAudioPlayEnd);
    // this.player.addEventListener('')
  }
  onAudioPlayEnd = () => {
    this.setState({ status: playStatus.WAIT_PLAY });
  }
  play = async (e) => {
    e && e.stopPropagation();
    await this.player.play();
    this.setState({ status: playStatus.PLAYING });
  }
  pause = (e) => {
    e && e.stopPropagation();
    this.player.pause();
    this.setState({ status: playStatus.PAUSE });
  }
  swipeRef = null;
  navToRecord = () => {
    const { history } = this.props;
    history.push('/record');
  }
  handleSlide = (i) => {
    console.log(i);
  }
  prev = () => {
    this.swipeRef.prev();
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
          <div styleName={classNames('audio-page', `theme${1}`)}>
            <Letter theme={1} />
            <div styleName="btn-record" onClick={this.navToRecord} />
          </div>
          <div styleName={classNames('audio-page', `theme${2}`)}>
            <Letter theme={2} />
            <div styleName="btn-record" onClick={this.navToRecord} />
          </div>
          <div styleName={classNames('audio-page', `theme${3}`)}>
            <Letter theme={3} />
            <div styleName="btn-record" onClick={this.navToRecord} />
          </div>
          <div styleName={classNames('audio-page', `theme${4}`)}>
            <Letter theme={4} />
            <div styleName="btn-record" onClick={this.navToRecord} />
          </div>
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
