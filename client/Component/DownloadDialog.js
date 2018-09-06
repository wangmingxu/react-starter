import React from 'react';
import ReactDOM from 'react-dom';
import DownloadDialog from '@lz-component/DownloadDialog';
import downloadIcon from 'assets/download-icon.png';
import { setDownloadUrl } from '@lz-utils/openApp';

setDownloadUrl('http://a.app.qq.com/o/simple.jsp?pkgname=com.yibasan.lizhifm&ckey=CK1381344360585');

export default class DL extends DownloadDialog {
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

export function showDownloadDialog(action) {
  const div = document.createElement('div');
  div.classList.add('dl');
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  ReactDOM.render(<DL status onClose={close} action={action} />, div);

  return {
    close,
  };
}

export class DownloadBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  download = () => {
    const { action } = this.props;
    showDownloadDialog(action);
  }
  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.render(), { onClick: this.download })}
      </React.Fragment>
    );
  }
}

