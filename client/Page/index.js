import React from 'react';
import '../styles/index.less';
import DownloadDialog from 'Component/DownloadDialog';

class Index extends React.Component {
  state = {
    downloadDialog: {
      status: false,
      action: {},
    },
  }
  componentDidMount() {
  }
  navToKol = () => {
    if (!window.isApp && !window.isWX) {
      this.setState({
        downloadDialog: {
          status: true,
          action: {
            type: 7,
            url: location.href,
          },
        },
      });
    } else {
      const { history } = this.props;
      const method = window.platform === 'IPhone' && window.isWX ? 'replace' : 'push';
      history[method]('/kol');
    }
  }
  render() {
    const { downloadDialog } = this.state;
    return (<div styleName="index-page">
      <DownloadDialog
        {...downloadDialog}
        onClose={() => {
          this.setState({ downloadDialog: { status: false } });
        }}
      />
      <div styleName="logo" />
      <div styleName="btn" onClick={this.navToKol} />
      <div styleName="tip" />
    </div>);
  }
}

export default Index;
