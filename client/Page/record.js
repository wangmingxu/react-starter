import React from 'react';
import '../styles/record.less';
import Logo from 'Component/Logo';
import RecordManage, { RecordStatus } from 'Component/recordManage';

class Index extends React.Component {
  state = {
    status: RecordStatus.WAITING_RECORD,
    recordTime: 0,
  }
  componentDidMount() {
    this.recordManager = new RecordManage({
      lzRecordType: 2,
      onRecordTimeChange: this.handleTimeChange,
      onRecordStatusChange: this.handleStatusChange,
      onUploadFinish: this.handleUploadFinish,
    });
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
    // todo
  }
  handleTimeChange = (time) => {
    this.setState({ recordTime: time });
  }
  handleStatusChange = (status) => {
    this.setState({ status });
  }
  handleUploadFinish = (id) => {
    console.log(id);
  }
  render() {
    const { status, recordTime } = this.state;
    return (
      <div styleName="record-page">
        <Logo />
        <div styleName="main">
          <img
            src="https://h5.lizhi.fm/static/voicereport/common/3.png"
            alt="avatar"
            styleName="avatar"
          />
          <div styleName="subject-text">
            <div styleName="tit" />
            你是乞力马扎罗山顶的雪，我是山脚下不 知名农户家里炉灶上的一团火。你在我心
            里亘古不变，而我的爱生生不息。想你的 时候，我就努力发热。
            <div styleName="from">——来自喜茶用户@栖檀w的情书</div>
          </div>
          <div styleName="time">TIME</div>
          <div styleName="process-bar">
            <div styleName="inset" style={{ width: `${Math.min(recordTime, 5000) / 5000 * 100}%` }} />
            <div styleName="cursor" style={{ left: `${Math.min(recordTime, 5000) / 5000 * 100}%` }} />
          </div>
        </div>
        {status === RecordStatus.WAITING_RECORD ? (<div styleName="btn-start" onClick={this.startRecord} />) : null}
        {status === RecordStatus.RECORD_START ? (<div styleName="btn-stop" onClick={this.endRecord} />) : null}
        {status === RecordStatus.RECORD_FINISH ? (<div styleName="btn-next" onClick={this.uploadAudio} />) : null}
        {status === RecordStatus.RECORD_FINISH ? (<div styleName="btn-remake" onClick={this.remake} />) : null}
      </div>
    );
  }
}

export default Index;
