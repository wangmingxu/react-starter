import React from 'react';
import '../styles/record.less';
import Logo from 'Component/Logo';
import RecordManage, { RecordStatus, ErrorType } from 'Component/recordManage';
import OnePage from 'Hoc/onePage';
import api from 'utils/api';
import { Toast } from 'antd-mobile';
import { sleep } from 'utils/promisify';
import { letterText } from 'constant';
import random from 'lodash/random';
import UploadDialog from 'Component/UploadDialog';
import withLogin from 'Hoc/withLogin';
import DefaultAvatar from 'assets/loveletter/default-avatar.png';

@withLogin(true)
class Record extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: RecordStatus.WAITING_RECORD,
      recordTime: 0,
      textId: random(0, 19),
      showUploadDialog: false,
      avatar: '',
    };
    this.recordManager = new RecordManage({
      isShowWXProgressTips: 0,
      lzRecordType: 2,
      onRecordTimeChange: this.handleTimeChange,
      onRecordStatusChange: this.handleStatusChange,
      onUploadFinish: this.handleUploadFinish,
      onError: this.handleRecordError,
    });
  }
  componentDidMount() {
    this.recordManager.init();
    this.loadAvatar();
  }
  componentWillUnmount() {
    this.recordManager.destroy();
  }
  loadAvatar = async () => {
    if (window.isWX) {
      const { data: { headimgurl } } = await api.loadUser();
      this.setState({ avatar: headimgurl });
    } else {
      this.setState({ avatar: DefaultAvatar });
    }
  }
  startRecord = () => {
    this.recordManager.startRecord();
  }
  endRecord = () => {
    this.recordManager.endRecord();
  }
  uploadAudio = () => {
    this.setState({ showUploadDialog: true });
    this.recordManager.uploadAudio();
  }
  remake = () => {
    this.recordManager.remakeRecord();
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
      this.setState({ showUploadDialog: false });
      break;
    case ErrorType.TIME_SHORT:
      errMsg = '录音时间太短，来不及保存呢';
      break;
    case ErrorType.CALL_RECORD_FAIL:
      errMsg = '调起录音功能失败';
      break;
    default:
      errMsg = '录音失败';
      break;
    }
    Toast.fail(errMsg, 1.5);
  }
  handleTimeChange = (time) => {
    this.setState({ recordTime: time });
  }
  handleStatusChange = (status) => {
    this.setState({ status });
  }
  handleUploadFinish = async (id) => {
    console.log(id);
    try {
      const { highBand } = await this.transAudio(id);
      const { data: audioId } = await api.addAudio({
        mediaId: id,
        audio: highBand,
        duration: this.recordManager.duration,
        textId: this.state.textId,
        theme: random(1, 4),
      });
      const method = window.platform === 'IPhone' && window.isWX ? 'replace' : 'push';
      this.props.history[method](`/ugc/${audioId}?isOwn=true`);
    } catch (error) {
      Toast.fail(error, 1.5);
      return Promise.reject(error);
    } finally {
      this.setState({ showUploadDialog: false });
    }
  }
  transAudio = async (id) => {
    try {
      const trans = window.isApp ? api.transApp : api.transWX;
      const idKey = window.isApp ? 'upload_id' : 'media_id';
      const res = await trans({ [idKey]: id });
      if (res.status === 0) {
        return res.data;
      } else if (res.status === 4) {
        await sleep(1000);
        const data = await this.transAudio(id);
        return data;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  render() {
    const {
      status, recordTime, textId, showUploadDialog, avatar,
    } = this.state;
    const percent = Math.ceil(Math.min(recordTime, 60000) / 60000 * 100);
    return (
      <div styleName="record-page">
        <Logo />
        <UploadDialog status={showUploadDialog} />
        <OnePage render={({ scale }) => (
          <div className="onePage" style={{ transform: `scale(${scale})` }}>
            <div styleName="main">
              <img
                src={avatar}
                alt="avatar"
                styleName="avatar"
              />
              <div styleName="subject-text">
                <div styleName="tit" />
                <div styleName="content">
                  <div dangerouslySetInnerHTML={{ __html: letterText[textId].text }} />
                  <div styleName="from">{letterText[textId].from}</div>
                </div>
              </div>
              <div styleName="time">TIME</div>
              <div styleName="process-bar">
                <div styleName="inset" style={{ width: `${percent}%` }} />
                <div styleName="cursor" style={{ left: `${percent}%` }} />
              </div>
            </div>
            {status === RecordStatus.WAITING_RECORD ? (<div styleName="btn-start" onClick={this.startRecord} />) : null}
            {status === RecordStatus.RECORD_START ? (<div styleName="btn-stop" onClick={this.endRecord} />) : null}
            {status === RecordStatus.RECORD_FINISH ? (<div styleName="btn-next" onClick={this.uploadAudio} />) : null}
            {status === RecordStatus.RECORD_FINISH ? (<div styleName="btn-remake" onClick={this.remake} />) : null}
          </div>
        )}
        />
      </div>
    );
  }
}

export default Record;
