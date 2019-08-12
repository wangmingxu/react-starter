import React from 'react';
import RecordManage, { ErrorType, RecordStatus, ReplayStatus } from '@lz-component/RecordManage';
import { Toast } from 'antd-mobile';
import { withUserAgent } from 'rc-useragent';
import dayjs from 'dayjs';
import classNames from 'classnames';
import '../styles/record.less';
import api from 'utils/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PostActions from 'Action/Post';
import { defaultAvatar } from 'constant';

@connect(
  state => ({ post: state.Post }),
  dispatch => bindActionCreators(PostActions, dispatch),
)
@withUserAgent
class Record extends React.PureComponent {
  get activityId() {
    const { location } = this.props;
    const params = new URLSearchParams(location.search);
    return params.get('activityId');
  }
  constructor(props) {
    super(props);
    this.state = {
      status: RecordStatus.WAITING_RECORD,
      replayStatus: ReplayStatus.WAIT_PLAY,
      currentTime: 0,
      userInfo: {},
    };
    this.recordManager = new RecordManage({
      needPreAuth: false,
      isShowWXProgressTips: 0,
      lzRecordType: 2,
      onRecordStatusChange: this.handleStatusChange,
      onError: this.handleRecordError,
      onRecordTimeChange: this.handleTimeChange,
      onUploadStart: this.handleUploadStart,
      onUploadFinish: this.handleUploadFinish,
      onReplayStatusChange: this.handleReplayStatusChange,
      onRecordTimeout: this.handleRecordTimeout,
    });
    this.sTime = 0;
    this.timer = null;
  }
  componentDidMount() {
    this.recordManager.init();
    this.loadUserInfo();
  }
  componentWillUnmount() {
    this.recordManager.destroy();
  }
  async loadUserInfo() {
    const { ua } = this.props;
    let userInfo;
    if (ua.isWeiXin) {
      userInfo = await api.getUserInfo({ activityId: 4 }, { needAuth: true }).then(res => res.data);
    } else if (ua.isLizhiFM) {
      userInfo = await lz.getSessionUser().then(res => ({
        head_cover: defaultAvatar,
        ...res,
        nick_name: res.name,
      }));
    }
    this.setState({ userInfo });
  }
  startRecord = () => {
    this.recordManager.startRecord();
  };
  endRecord = () => {
    const { currentTime } = this.state;
    if (currentTime > 5000) {
      this.recordManager.endRecord();
    }
  };
  remakeRecord = () => {
    this.recordManager.remakeRecord();
    this.setState({ currentTime: 0 });
  };
  finish = () => {
    this.recordManager.uploadAudio();
  };
  handleTimeChange = (currentTime) => {
    this.setState({ currentTime });
  };
  handleStatusChange = (status) => {
    this.setState({ status });
  };
  handleRecordError = (type) => {
    let errMsg;
    switch (type) {
    case ErrorType.NO_PERMISSION:
      errMsg = '没有录音权限';
      break;
    case ErrorType.RECORD_SAVE_FAIL:
      errMsg = '录音保存失败';
      break;
    case ErrorType.UPLOAD_FAIL:
      errMsg = '录音上传失败';
      break;
    case ErrorType.TIME_SHORT:
      errMsg = '录音时间太短，来不及分析呢';
      break;
    case ErrorType.CALL_RECORD_FAIL:
      errMsg = '调起录音功能失败';
      break;
    default:
      errMsg = '录音失败';
      break;
    }
    Toast.info(errMsg, 1);
  };
  handleRecordTimeout = () => {
    Toast.info('录音最长不超过60秒', 1);
  };
  handleUploadStart = () => {
    Toast.loading('正在上传录音...', 0);
  };
  handleUploadFinish = async (id) => {
    try {
      const { highBand } = await this.transAudio(id);
      this.props.setPost({
        file: highBand,
        // file: 'http://cdn5.lizhi.fm/audio/2018/02/15/2653140969335672326_hd.mp3',
        media_id: id,
        duration: parseInt(this.recordManager.duration, 10) * 1000,
      });
      this.props.history.push(`/post?activityId=${this.activityId}`);
    } catch (error) {
      window.alert(error);
    } finally {
      Toast.hide();
    }
  };
  transAudio = async (id) => {
    const { ua } = this.props;
    try {
      let res;
      if (ua.isLizhiFM) {
        res = await api.transApp({ upload_id: id });
      } else {
        res = await api.transWX({ media_id: id, tag: 'brand' });
      }
      if (res.status === 0) {
        return res.data;
      } else if (res.status === 4) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = await this.transAudio(id);
        return data;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
  handleReplayStatusChange = (status) => {
    // TODO: 监听wx.onVoicePlayEnd不生效
    this.setState({ replayStatus: status });
    if (status === ReplayStatus.PLAYING) {
      this.sTime = Date.now();
      this.timer = setInterval(() => {
        const currentTime = Date.now() - this.sTime;
        if (currentTime / 1000 >= this.recordManager.duration) {
          clearInterval(this.timer);
          this.setState({ replayStatus: ReplayStatus.WAIT_PLAY });
        } else {
          this.setState({ currentTime: Date.now() - this.sTime });
        }
      }, 50);
    } else {
      clearInterval(this.timer);
    }
  };
  startReplay = () => {
    this.recordManager.startReplay();
  };
  stopReplay = () => {
    this.recordManager.stopReplay();
  };
  render() {
    const {
      status, currentTime, replayStatus, userInfo,
    } = this.state;
    const time = dayjs(currentTime).format('mm:ss');
    return (
      <div styleName="page-record">
        <div styleName="main">
          <div styleName="avatar-wrapper">
            <img styleName="avatar" src={userInfo.head_cover} alt="avatar" />
            {status === RecordStatus.RECORD_FINISH ? (
              <React.Fragment>
                {replayStatus === ReplayStatus.PLAYING ? (
                  <div styleName="btn-control pause" onClick={this.stopReplay} />
                ) : (
                  <div styleName="btn-control play" onClick={this.startReplay} />
                )}
              </React.Fragment>
            ) : null}
          </div>
          <div styleName="nickname">{userInfo.nick_name}</div>
          <div styleName="time">
            <div styleName="icon-clock" />
            <div>{time}</div>
          </div>
          {status === RecordStatus.WAITING_RECORD ? (
            <div styleName="btn-record" onClick={this.startRecord}>
              开始录音
            </div>
          ) : null}
          {status === RecordStatus.RECORD_START ? (
            <div
              styleName={classNames('btn-record', 'recording', { disable: currentTime < 5000 })}
              onClick={this.endRecord}
            >
              完成
            </div>
          ) : null}
          {status === RecordStatus.RECORD_FINISH ? (
            <div styleName="finish">
              <div styleName="btn-remake" onClick={this.remakeRecord}>
                重录
              </div>
              <div styleName="btn-finish" onClick={this.finish}>
                下一步
              </div>
            </div>
          ) : null}
          <div styleName="tips">
            您也可以通过主页右上方“一汽丰田”官方电台， 投稿上传更加专业的音频作品{' '}
          </div>
        </div>
      </div>
    );
  }
}

export default Record;
