import React from 'react';
import Banner from 'Component/Banner';
import RecordManage, { ErrorType, RecordStatus } from '@lz-component/RecordManage';
import { Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import classNames from 'classnames';
import '../styles/record.less';

class Record extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: RecordStatus.WAITING_RECORD,
      currentTime: 0,
    };
    this.recordManager = new RecordManage({
      isShowWXProgressTips: 0,
      lzRecordType: 2,
      onRecordStatusChange: this.handleStatusChange,
      onError: this.handleRecordError,
      onRecordTimeChange: this.handleTimeChange,
      onUploadStart: this.handleUploadStart,
      onUploadFinish: this.handleUploadFinish,
    });
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
    Toast.info(errMsg, 1.5);
  }
  handleUploadStart = () => {
    Toast.info('正在上传录音...', 0);
  }
  handleUploadFinish = (id) => {
    console.log(id);
    Toast.hide();
  }
  render() {
    const { status, currentTime } = this.state;
    const time = dayjs(currentTime).format('mm:ss');
    return (
      <div styleName="page-record">
        <Banner logo detail />
        <div styleName="main">
          <div styleName="panl">
            <div styleName="panl-title">
              <div styleName="avatar-wrapper">
                <img
                  styleName="avatar"
                  src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0"
                  alt="avatar"
                />
              </div>
              <div styleName="nickname">1橘子哥哥1</div>
            </div>
            <div styleName="panl-content">
              {status === RecordStatus.RECORD_START ? <div styleName="status">正在录音</div> : null}
              <div styleName="time">{time}</div>
              <div styleName="melody" />
              <div styleName="text">
                <div styleName="tit">录制内容建议</div>
              说下你的入学感想吧<br />说下你的大学生活感想吧
              </div>
            </div>
          </div>
        </div>
        {status === RecordStatus.WAITING_RECORD ? <div styleName="btn-start" onClick={this.startRecord}>开始录音</div> : null}
        {status === RecordStatus.RECORD_START ? <div styleName={classNames('btn-end', { disable: currentTime < 5000 })} onClick={this.endRecord}>结束录音</div> : null}
        {status === RecordStatus.RECORD_FINISH ? <div styleName="ft">
          <div styleName="btn-remake" onClick={this.remakeRecord}>重新录</div>
          <div styleName="btn-finish" onClick={this.finish}>下一步</div>
        </div> : null}
      </div>
    );
  }
}

export default Record;
