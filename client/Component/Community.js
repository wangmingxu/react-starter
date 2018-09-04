import React from 'react';
import { showShareOverlay } from '@lz-component/ShareOverlay';
import '../styles/community.less';
import { withUserAgent } from 'rc-useragent';
import { WithLoginBtn } from 'Hoc/WithLogin';
import { showDownloadDialog } from 'Component/DownloadDialog';

@withUserAgent
class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  share = () => {
    const { ua } = this.props;
    if (ua.isLizhiFM) {
      lz.shareUrl({
        url: location.href,
        title: window.shareData.title,
        desc: window.shareData.desc, // 分享的描述
        'image-url': window.shareData.imgUrl, // 分享的图片
      });
    } else {
      showShareOverlay();
    }
  }
  downloadApp = () => {
    showDownloadDialog({
      type: 7,
      url: location.href,
    });
  }
  render() {
    const { style, className, ua } = this.props;
    return (<div styleName="community-item" style={style} className={className}>
      <div styleName="cnt">
        <div styleName="rank">1</div>
        <img styleName="avatar" alt="avatar" src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0" />
        <div styleName="info">
          <div styleName="name">四川广州大学广播台</div>
          <div styleName="votes">新声值：53244<span styleName="add">+1</span></div>
          <div styleName="operation">
            {ua.isLizhiFM ?
              <WithLoginBtn render={() => <div styleName="btn btn-vote">贡献</div>} /> :
              <div styleName="btn btn-vote" onClick={this.downloadApp}>贡献</div>
            }
            <div styleName="btn btn-listen">听新声</div>
            <div styleName="btn btn-share" onClick={this.share}>转发</div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Community;
