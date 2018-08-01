import React from 'react';
import '../styles/record.less';
import Logo from 'Component/Logo';
import RecordManage, { RecordStatus } from 'Component/recordManage';
import OnePage from 'Hoc/onePage';
import api from 'utils/api';
import { Toast } from 'antd-mobile';
import { sleep } from 'utils/promisify';
import { letterText } from 'constant';
import random from 'lodash/random';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: RecordStatus.WAITING_RECORD,
      recordTime: 0,
      textId: random(letterText.length - 1),
    };
    this.recordManager = new RecordManage({
      lzRecordType: 2,
      onRecordTimeChange: this.handleTimeChange,
      onRecordStatusChange: this.handleStatusChange,
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
    this.recordManager.endRecord();
  }
  uploadAudio = () => {
    this.recordManager.uploadAudio();
  }
  remake = () => {
    this.recordManager.remakeRecord();
  }
  handleTimeChange = (time) => {
    this.setState({ recordTime: time });
  }
  handleStatusChange = (status) => {
    this.setState({ status });
  }
  handleUploadFinish = async (id) => {
    console.log(id);
    const { highBand } = await this.transAudio(id);
    const idKey = window.isApp ? 'uploadid' : 'mediaId';
    const { data: audioId } = await api.addAudio({
      [idKey]: id,
      audio: highBand,
      duration: this.recordManager.duration,
      textId: this.state.textId,
      theme: random(1, 4),
    });
    this.props.history.push(`/ugc/${audioId}`);
  }
  transAudio = async (id) => {
    try {
      const trans = window.isApp ? api.transApp : api.transWX;
      const idKey = window.isApp ? 'upload_id' : 'media_id';
      Toast.loading('正在进行音频转码...', 0);
      const res = await trans({ [idKey]: id });
      if (res.status === 0) {
        Toast.hide();
        return res.data;
      } else if (res.status === 4) {
        await sleep(1000);
        const data = await this.transAudio(id);
        return data;
      }
    } catch (error) {
      Toast.fail(error);
      return Promise.reject(error);
    }
  }
  render() {
    const { status, recordTime, textId } = this.state;
    return (
      <div styleName="record-page">
        <Logo />
        <OnePage render={({ scale }) => (
          <div className="onePage" style={{ transform: `scale(${scale})` }}>
            <div styleName="main">
              <img
                src="https://h5.lizhi.fm/static/voicereport/common/3.png"
                alt="avatar"
                styleName="avatar"
              />
              <div styleName="subject-text">
                <div styleName="tit" />
                <div dangerouslySetInnerHTML={{ __html: letterText[textId].text }} />
                <div styleName="from">{letterText[textId].from}</div>
              </div>
              <div styleName="time">TIME</div>
              <div styleName="process-bar">
                <div styleName="inset" style={{ width: `${Math.min(recordTime, 60000) / 60000 * 100}%` }} />
                <div styleName="cursor" style={{ left: `${Math.min(recordTime, 60000) / 60000 * 100}%` }} />
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

export default Index;
