import React from 'react';
import '../styles/vote-dialog.less';

class VoteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div className="mask">
      <div styleName="vote-dialog">
        <div styleName="tip">你当前有150贡献值，请选择贡献票数</div>
        <div styleName="btn">贡献10票</div>
        <div styleName="btn">贡献全部</div>
      </div>
    </div>);
  }
}

export default VoteDialog;
