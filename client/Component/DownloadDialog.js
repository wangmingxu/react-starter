import React from 'react';
import DownloadDialog from '@lz-component/DownloadDialog';
import downloadIcon from 'assets/download-icon.png';

export default class extends DownloadDialog {
  constructor(props) {
    super(props);
  }
  render() {
    const { status, action, onClose } = this.props;
    const { commandCode } = this.state;
    return status ? (
      <div className="mask" key="download-dialog" onClick={onClose}>
        <div className="download-dialog">
          <img src={downloadIcon} className="download-icon" alt="下载荔枝" />
          <div className="download-tip">请下载或打开荔枝APP进行操作哦</div>
          <div className="operation">
            <div className="btn download" onClick={this.download} data-clipboard-text={commandCode} id="downloadApp">下载荔枝APP</div>
            <div
              id="openApp"
              data-clipboard-text={commandCode}
              className="btn open"
              onClick={() => {
                this.openApp(action);
              }}
            >打开荔枝APP</div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
