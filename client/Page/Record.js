import React from 'react';
import RecordManage, { ErrorType, RecordStatus, ReplayStatus } from '@lz-component/RecordManage';
import { Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import classNames from 'classnames';
import '../styles/record.less';
import api from 'utils/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PostActions from 'Action/Post';

@connect(
  state => ({ post: state.Post, mine: state.Mine }),
  dispatch => bindActionCreators(PostActions, dispatch),
)
class Record extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: RecordStatus.WAITING_RECORD,
      replayStatus: ReplayStatus.WAIT_PLAY,
      currentTime: 0,
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
  }
  componentWillUnmount() {
    this.recordManager.destroy();
  }
  startRecord = () => {
    this.recordManager.startRecord();
  }
  endRecord = () => {
    const { currentTime } = this.state;
    if (currentTime > 5000) {
      this.recordManager.endRecord();
    }
  }
  remakeRecord = () => {
    this.recordManager.remakeRecord();
    this.setState({ currentTime: 0 });
  }
  finish = () => {
    this.recordManager.uploadAudio();
  }
  handleTimeChange = (currentTime) => {
    this.setState({ currentTime });
  }
  handleStatusChange = (status) => {
    this.setState({ status });
  }
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
  }
  handleRecordTimeout = () => {
    Toast.info('录音最长不超过60秒', 1);
  }
  handleUploadStart = () => {
    Toast.loading('正在上传录音...', 0);
  }
  handleUploadFinish = async (id) => {
    try {
      const { highBand } = await this.transAudio(id);
      this.props.setPost({
        audio: highBand,
        // audio: 'http://cdn5.lizhi.fm/audio/2018/02/15/2653140969335672326_hd.mp3',
        mediaId: id,
        duration: this.recordManager.duration * 1000,
      });
      this.props.history.push('/post');
    } catch (error) {
      window.alert(error);
    } finally {
      Toast.hide();
    }
  }
  transAudio = async (id) => {
    try {
      const res = await api.transApp({ upload_id: id });
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
  }
  handleReplayStatusChange = (status) => {
    this.setState({ replayStatus: status });
    if (status === ReplayStatus.PLAYING) {
      this.sTime = Date.now();
      this.timer = setInterval(() => {
        this.setState({ currentTime: Date.now() - this.sTime });
      }, 50);
    } else {
      clearInterval(this.timer);
    }
  }
  startReplay = () => {
    this.recordManager.startReplay();
  }
  stopReplay = () => {
    this.recordManager.stopReplay();
  }
  render() {
    const { status, currentTime, replayStatus } = this.state;
    const { mine } = this.props;//TODO: 补全
    const time = dayjs(currentTime).format('mm:ss');
    return (
      <div styleName="page-record">
        <div styleName="main">
          <div styleName="avatar-wrapper">
            <img
              styleName="avatar"
              src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0"
              alt="avatar"
            />
            {status === RecordStatus.RECORD_FINISH ?
              <React.Fragment>
                {(replayStatus === ReplayStatus.PLAYING ? <div styleName="btn-control pause" onClick={this.stopReplay} /> : <div styleName="btn-control play" onClick={this.startReplay} />)}
              </React.Fragment> :
              null
            }
          </div>
          <div styleName="nickname">
            MX
          </div>
          <div styleName="time"><div styleName="icon-clock" />{time}</div>
          {status === RecordStatus.WAITING_RECORD ? <div styleName="btn-record" onClick={this.startRecord}>开始录音</div> : null}
          {status === RecordStatus.RECORD_START ? <div styleName={classNames('btn-record', 'recording', { disable: currentTime < 5000 })} onClick={this.endRecord}>完成</div> : null}
          {status === RecordStatus.RECORD_FINISH ? <div styleName="finish">
            <div styleName="btn-remake" onClick={this.remakeRecord}>重录</div>
            <div styleName="btn-finish" onClick={this.finish}>下一步</div>
          </div> : null}
          <div styleName="tips">您也可以通过主页右上方“一汽丰田”官方电台， 投稿上传更加专业的音频作品 </div>
        </div>
      </div>
    );
  }
}

export default Record;
