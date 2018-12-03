import ClientDetectService from '@lizhife/lz-market-service/package/ClientDetectService';
import RecordService, {
  ErrorType,
  RecordStatus,
} from '@lizhife/lz-market-service/package/RecordService';
import { Toast } from 'antd-mobile';
import classNames from 'classnames';
import { recordText } from 'constant';
import sample from 'lodash/sample';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IApplicationState } from 'Reducer';
import { IUserInfo } from 'types';
import { HttpAliasMap } from 'types/service';
import '../styles/record.less';

interface IProps extends RouteComponentProps {
  cdServ: ClientDetectService;
  recordServ: RecordService;
  userInfo: IUserInfo;
  httpAlias: HttpAliasMap;
}

interface IState {
  status: RecordStatus;
  recordingTime: number;
  text: string[];
}

class Record extends PureComponent<IProps, IState> {
  public state = {
    status: RecordStatus.WAITING_RECORD,
    recordingTime: 0,
    text: [],
  };

  public startTime = 0;

  public endTime = 0;

  public recordDelay = 150;

  public recordBtn = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    this.recordBtn.current!.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
    this.props.recordServ.init({
      isShowWXProgressTips: 0,
      immediateUpload: true,
      maxRecordTime: 5 * 1000, // 服务端限制最长录音时长是8s
      onRecordStatusChange: this.handleRecordStatus,
      onError: this.handleRecordError,
      onRecordTimeChange: this.handleTimeChange,
      onUploadStart: this.handleUploadStart,
      onUploadFinish: this.handleUploadFinish,
    });
    this.setState({ text: sample(recordText)!.split(/[？,；]/) });
  }

  public componentWillUnmount() {
    this.props.recordServ.destroy();
  }

  public startRecord = () => {
    this.startTime = Date.now();
    setTimeout(() => {
      const delta = this.endTime - this.startTime;
      if (delta > 0 && delta <= this.recordDelay) {
        return;
      }
      this.props.recordServ.startRecord();
      (window as any)._hmt.push(['_trackEvent', '按钮', '点击', '按住录音']);
    }, 150);
  };

  public endRecord = () => {
    this.endTime = Date.now();
    const delta = this.endTime - this.startTime;
    if (delta <= this.recordDelay) {
      return;
    }
    if (this.state.status < RecordStatus.RECORD_FINISH) {
      // 如果已经超时停止则不需要执行
      this.props.recordServ.endRecord();
    }
  };

  public handleTimeChange = (current) => {
    this.setState({ recordingTime: current });
  };

  public handleUploadStart = () => {
    Toast.info('正在上传录音...', 0);
  };

  public handleUploadFinish = (id) => {
    const {
      userInfo, history, cdServ, httpAlias,
    } = this.props;
    const apiMethod = cdServ.isWeiXin ? 'WXAnalysis' : 'APPAnalysis';
    const audioIdKey = cdServ.isWeiXin ? 'mediaId' : 'uploadId';
    httpAlias[apiMethod]({
      [audioIdKey]: id,
      ...userInfo,
    })
      .then((rst) => {
        if (rst.rCode === 0) {
          const { analysisId } = rst.data;
          history.push(`/loading/${analysisId}`);
        } else {
          Toast.fail(rst.msg, 1.5);
          if (rst.rCode === 2) {
            setTimeout(() => {
              history.go(-1); // 名字违规
            }, 1500);
          }
        }
      })
      .catch((e) => {
        Toast.fail(e, 1.5);
        setTimeout(() => {
          this.props.recordServ.remakeRecord();
        }, 1500);
      });
    // todo hide Toast
  };

  public handleRecordStatus = (status) => {
    this.setState({ status });
  };

  public handleRecordError = (type) => {
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
    Toast.fail(errMsg, 1.5);
  };

  public render() {
    const { recordingTime, status, text } = this.state;
    const roate = -80 + (Math.min(recordingTime, 5000) / 5000) * 70;
    return (
      <div styleName="page">
        <div styleName="rounds">
          <div styleName="wrapper-progress_bar">
            <div styleName="outter progress_bar" />
            <div styleName="inner progress_bar" style={{ transform: `rotate(${roate}deg)` }} />
          </div>
          <div
            className="noselect"
            styleName={classNames('btn-record', {
              active: status === RecordStatus.RECORD_START,
            })}
            ref={this.recordBtn}
            onTouchStart={this.startRecord}
            onTouchEnd={this.endRecord}
          >
            <div styleName="press" />
          </div>
        </div>
        <div styleName="wrapper-text">
          <div styleName="tit">不负责任的文案建议</div>
          {text.map((item, i) => (
            <div styleName="text" key={i}>
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect((state: IApplicationState) => ({
  userInfo: state.UserInfo,
  recordServ: state.Injector.get('recordServ'),
  cdServ: state.Injector.get('cdServ'),
  httpAlias: state.Injector.get('$http').alias,
}))(Record);
