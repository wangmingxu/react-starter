import * as ResultActions from '@/Action/Result';
import avatar from '@/assets/avatar';
import { IApplicationState } from '@/Reducer';
import { IResult, IUserInfo } from '@/types';
import { stopPropagation } from '@/utils/domHelper';
import { showDownloadDialog } from '@/utils/openApp';
import { timeout } from '@/utils/promisify';
import AudioPlayerService, {
  AudioStatus,
  EventMap as AudioEventMap,
} from '@common-service/AudioPlayerService';
import { Toast } from 'antd-mobile';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import '../styles/voice.less';

interface IProps extends RouteComponentProps<{ id: string }> {
  result: IResult;
  userInfo: IUserInfo;
  player: AudioPlayerService;
  pollResult: (analysisId: string) => any;
}

interface IState {
  status: AudioStatus;
  showAudioCtrlBtn: boolean;
}

class Voice extends PureComponent<IProps, IState> {
  public state = {
    status: AudioStatus.WAIT_PLAY,
    showAudioCtrlBtn: false,
  };

  public async componentDidMount() {
    const { player, result: {voiceMan: {voiceManAudioUrl}} } = this.props;
    // 兼容从外部浏览器打开丢失redux store里面的数据
    if (!voiceManAudioUrl) {
      await this.props.pollResult(this.analysisId);
    }
    player.on(AudioEventMap.STATUS_CHANGE, this.handleAudioStatusChange);
    player.on(AudioEventMap.ERROR, this.handleAudioError);
    !player.audioRef.src && player.setAudioSrc(this.props.result.voiceMan.voiceManAudioUrl, false)
    if (player.audioStatus !== AudioStatus.PLAYING) {
      Toast.info('正在加载音频...', 0);
      try {
        await Promise.race([player.play(), timeout(5000)]);
      } catch (e) {
        this.handleAudioError(e);
      } finally {
        Toast.hide();
      }
    }
  }

  public componentWillUnmount() {
    const { player } = this.props;
    player.pause();
    player.off(AudioEventMap.STATUS_CHANGE, this.handleAudioStatusChange);
    player.off(AudioEventMap.ERROR, this.handleAudioError);
  }

  public handleAudioError = (error) => {
    console.log(error);
    this.props.player.reset();
    this.setState({ showAudioCtrlBtn: true });
  };

  public handleAudioStatusChange = (status) => {
    this.setState({ status });
    if (status === AudioStatus.WAIT_PLAY) {
      this.setState({ showAudioCtrlBtn: true });
    }
  };

  get analysisId() {
    const { match } = this.props;
    return match.params.id;
  }

  public testFate = () => {
    const [matchstr, userId, id] = this.props.result.voiceMan.voiceManLink.match(/\/(\d+)\/(\d+)$/);
    console.log(matchstr);
    const action = {
      type: 28,
      id, // 声音 id
      extraData: {
        userId, // 主播 id
      },
    };
    showDownloadDialog(action);
  };

  public toggleAudioBtn = () => {
    const { status } = this.state;
    if (status === AudioStatus.PLAYING) {
      this.setState({
        showAudioCtrlBtn: !this.state.showAudioCtrlBtn,
      });
    }
  };

  public play = () => {
    this.props.player.play();
    this.setState({
      showAudioCtrlBtn: false,
    });
  };

  public pause = () => {
    this.props.player.pause();
  };

  public render() {
    const { status, showAudioCtrlBtn } = this.state;
    const { result, userInfo } = this.props;
    return (
      <div styleName={classNames('page', { showAudioCtrlBtn })} onClick={this.toggleAudioBtn}>
        {userInfo.name ? (
          <div styleName="title">
            {userInfo.name}
            <br />
            {' '}
            专属声音气质报告
          </div>
        ) : null}
        <div styleName={classNames('player', { isPlaying: status === AudioStatus.PLAYING })}>
          <div styleName="rocker" />
          {status !== AudioStatus.PLAYING ? (
            <div styleName="btn-play" onClick={stopPropagation(this.play)} />
          ) : (
            <div styleName="btn-pause" onClick={stopPropagation(this.pause)} />
          )}
          {result.voiceMan.matchType > 0 ? (
            <img
              src={avatar[result.voiceMan.matchType - 1]}
              alt="avatar"
              styleName="avatar"
            />
          ) : null}
          <div styleName="static-round">
            <div styleName="dash" />
          </div>
          <div styleName="round1" />
          <div styleName="round2" />
          <div styleName="round3" />
          <div styleName="btn-test-fate" onClick={stopPropagation(this.testFate)} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IApplicationState) => ({
    result: state.Result,
    userInfo: state.UserInfo,
    player: state.Injector.get('player', {}),
  }),
  dispatch => bindActionCreators(ResultActions, dispatch),
)(Voice);
