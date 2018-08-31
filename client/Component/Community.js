import React from 'react';
import '../styles/community.less';

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { style } = this.props;
    return (<div styleName="community-item" style={style}>
      <div styleName="cnt">
        <div styleName="rank">1</div>
        <img styleName="avatar" alt="avatar" src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0" />
        <div styleName="info">
          <div styleName="name">四川广州大学广播台</div>
          <div styleName="votes">新声值：53244<span styleName="add">+1</span></div>
          <div styleName="operation">
            <div styleName="btn btn-vote">贡献</div>
            <div styleName="btn btn-listen">听新声</div>
            <div styleName="btn btn-share">分享</div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Community;
