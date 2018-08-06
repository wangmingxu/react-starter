import React from 'react';
import { openWithAction, getDownloadUrl } from 'utils/openApp';
import OpenBrowserGuide from 'Component/OpenBrowserGuide';
import downloadIcon from 'assets/download_icon.png';
import { axiosInstance } from 'utils/api';
import md5 from 'md5';
import Clipboard from 'clipboard';

const download = () => {
  _hmt.push(['_trackEvent', '按钮', '点击', '去下载荔枝']);
  window.location.href = getDownloadUrl();
};

class DownloadDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showBrowserGuide: false,
      command: '',
    };
  }
  async componentWillReceiveProps(newProps) {
    if (newProps.status) {
      const url = window.isPre ? 'https://commandpre.lizhi.fm/get_command_code' : 'https://command.lizhi.fm/get_command_code';
      const { action } = newProps;
      const requestId = md5(action.url || action.id);
      const rst = await axiosInstance.get(url, {
        params: {
          requestId,
          commandType: action.type,
          commandContent: action.type === 7 ? JSON.stringify(action) : action.id,
          commandAddUser: 'custom',
          commandAddTime: new Date().getTime(),
        },
      });
      if (rst.rcode === 0) {
        this.setState({ command: rst.data.commandCode }, () => {
          new Clipboard('#downloadApp');
          new Clipboard('#openApp');
        });
      }
    }
  }
  openApp = (action) => {
    _hmt.push(['_trackEvent', '按钮', '点击', '打开荔枝']);
    const result = openWithAction(action);
    if (!result) {
      this.setState({
        showBrowserGuide: true,
      });
    }
  }
  closeGuide = () => {
    this.setState({ showBrowserGuide: false });
  }
  render() {
    const { status, action, onClose } = this.props;
    const { showBrowserGuide, command } = this.state;
    return status ? [showBrowserGuide ? null : (
      <div className="mask" key="download-dialog">
        <div className="common-dialog download-dialog">
          <div className="btn-close" onClick={onClose} />
          <div className="content-box">
            <div className="msg">
              <img src={downloadIcon} className="download-icon" alt="下载荔枝" />
            </div>
            <div className="ft">
              <div className="btn download" onClick={download} data-clipboard-text={command} id="downloadApp">下载荔枝APP</div>
              <div
                id="openApp"
                data-clipboard-text={command}
                className="btn open"
                onClick={() => {
                  this.openApp(action);
                }}
              >打开荔枝APP</div>
            </div>
          </div>
        </div>
      </div>
    ), <OpenBrowserGuide status={showBrowserGuide} onClose={this.closeGuide} key="guide" />] : null;
  }
}

export default DownloadDialog;
