import React from 'react';
import Banner from 'Component/Banner';
import Community from 'Component/Community';
import '../styles/mine.less';
import api from 'utils/api';

class Mine extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await api.listMyAudio({}, { needAuth: true });
  }
  render() {
    return (
      <div styleName="page-mine">
        <Banner logo detail />
        <div styleName="panl">
          <div styleName="panl-title">
            <div styleName="avatar-wrapper">
              <img
                styleName="avatar"
                src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0"
                alt="avatar"
              />
            </div>
            <div styleName="nickname">橘子哥哥1</div>
          </div>
          <div styleName="panl-content">
            {new Array(10).fill({}).map((el, i) => (
              <Community key={i} styleName="item" />
            ))}
            {/* <div styleName="empty">还没有上传新的声音</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Mine;
