import promisify from 'utils/promisify';

const defaultOpt = {
  minRecordTime: 5 * 1000,
  maxRecordTime: 60 * 1000,
  immediateUpload: false,
  lzRecordType: 1,
  onRecordTimeChange: () => {},
  onRecordStatusChange: () => {},
  onUploadFinish: () => {},
  onUploadStart: () => {},
  isShowWXProgressTips: 1,
  onError: () => {},
};

export const ErrorType = {
  NO_PERMISSION: 1,
  RECORD_SAVE_FAIL: 2,
  UPLOAD_FAIL: 3,
  TIME_SHORT: 4,
  CALL_RECORD_FAIL: 5,
};

export const RecordStatus = {
  WAITING_RECORD: 0,
  RECORD_START: 1,
  RECORD_FINISH: 2,
};

class RecordManage {
  constructor(options) {
    this.$options = Object.assign({}, defaultOpt, options);
    this.status = RecordStatus.WAITING_RECORD;
    this.recordingTime = 0;
    this.localId = 0;
    this.serverId = 0;
    this.uploadId = 0;
    this.duration = 0;
    this.audioUrl = 0;
    this.sTimer = null;
    this.recordStateChangeCallbackId = 0;
  }
  init = () => {
    this.authorize();
    if (window.isWX) {
      // 录音时间超过一分钟没有停止的时候会执行 complete 回调
      wx.onVoiceRecordEnd({
        success: (res) => {
          const { localId } = res;
          this.localId = localId;
          this.endRecord();
        },
      });
    } else if (window.isApp) {
      this.recordStateChangeCallbackId = lz.on('recordStateChange', (ret) => {
        // console.log(ret);
        if (ret && ret.status) {
          switch (ret.status) {
          case 'uploadStart':
            this.$options.onUploadStart();
            console.log('正在上传音频');
            break;
          case 'uploadFinish':
            console.log('音频上传完成！');
            console.log(ret.uploadId);
            // window.alert(ret.uploadId);
            this.uploadId = ret.uploadId;
            this.$options.onUploadFinish(ret.uploadId);
            break;
          case 'recordFinish':
            console.log('完成录音');
            break;
          case 'replayStart':
            console.log('开始回放录音');
            break;
          case 'replayFinish':
            console.log('回放录音完成');
            break;
          case 'failed':
            this.throwError(ret.errorCode);
            break;
          default:
            break;
          }
        }
      });
    } else {
      //
    }
  }
  authorize = async () => {
    if (!localStorage.rainAllowRecord || localStorage.rainAllowRecord !== 'true') {
      if (window.isWX) {
        await promisify(wx.startRecord);
        wx.stopRecord();
      } else if (window.isApp) {
        await lz.startRecordVoice({ type: this.$options.lzRecordType });// 活动类型，由H5指定
        lz.stopRecordVoice({
          isNeedUpload: false,
          isNeedSave: false,
        });
      }
      localStorage.rainAllowRecord = 'true';
    }
  }
  runTimer = () => {
    const startTime = Date.now();
    this.sTimer = setInterval(() => {
      const currentTime = Date.now();
      const recordingTime = currentTime - startTime;
      if (this.recordingTime >= this.$options.maxRecordTime) {
        this.endRecord();
      } else {
        this.recordingTime = recordingTime;
        this.$options.onRecordTimeChange(recordingTime);
      }
    }, 50);
  }
  startRecord = async () => {
    try {
      if (window.isApp) {
        await lz.startRecordVoice({ type: this.$options.lzRecordType });
      } else if (window.isWX) {
        await promisify(wx.startRecord);
      } else {
        // return
      }
      this.runTimer();
      this.changeRecordStatus(RecordStatus.RECORD_START);
    } catch (error) {
      this.throwError(ErrorType.CALL_RECORD_FAIL);
    }
  }
  endRecord = async () => {
    clearInterval(this.sTimer);
    if (this.recordingTime < this.$options.minRecordTime) {
      this.throwError(ErrorType.TIME_SHORT);
      if (window.isWX) {
        wx.stopRecord();
      } else if (window.isApp) {
        lz.stopRecordVoice({
          isNeedUpload: false,
          isNeedSave: false,
        });
      }
      // this.remakeRecord();
      return;
    }
    this.changeRecordStatus(RecordStatus.RECORD_FINISH);
    this.duration = this.recordingTime;
    if (window.isApp) {
      await lz.stopRecordVoice({
        isNeedUpload: this.$options.immediateUpload,
        isNeedSave: true,
      });
    } else if (window.isWX) {
      wx.stopRecord({
        success: ({ localId }) => {
          this.localId = localId;
          this.$options.immediateUpload && this.uploadAudio();
        },
      });
    }
  }
  uploadAudio = () => {
    if (window.isWX) {
      this.$options.onUploadStart();
      wx.uploadVoice({
        localId: this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
        isShowProgressTips: this.$options.isShowWXProgressTips, // 默认为1，显示进度提示
        success: ({ serverId }) => {
          this.serverId = serverId;
          this.$options.onUploadFinish(serverId);
        },
        fail: () => {
          this.throwError(ErrorType.UPLOAD_FAIL);
        },
      });
    } else if (window.isApp) {
      lz.uploadRecordVoice();
    }
  }
  changeRecordStatus = (status) => {
    this.status = status;
    this.$options.onRecordStatusChange(status);
  }
  throwError = (errType) => {
    this.$options.onError(errType);
    this.remakeRecord();
  }
  remakeRecord = () => {
    this.recordingTime = 0;
    this.changeRecordStatus(RecordStatus.WAITING_RECORD);
    this.$options.onRecordTimeChange(0);
  }
  destroy() {
    if (window.isWX) {
      wx.stopRecord();
    } else if (window.isApp) {
      lz.stopRecordVoice({
        isNeedUpload: false,
        isNeedSave: false,
      });
      // lz.replayRecordVoice({
      //   operation: 1,
      // });
      lz.off('recordStateChange', this.recordStateChangeCallbackId);
    }
  }
}

export default RecordManage;
