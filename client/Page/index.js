import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withUserAgent } from 'rc-useragent';
import logo from '@/assets/logo.png';
import Kol from '@/Component/Kol';
import Rank from '@/Component/Rank';
import { WithLoginBtn } from 'Hoc/WithLogin';
import { showRecordDialog } from '@/Component/RecordDialog';
import { showDetailDialog } from '@/Component/ActivityDetail';
import { showDownloadDialog } from '@lz-component/DownloadDialog';
import { ProgramType } from 'constant';

import '../styles/index.less';

@withUserAgent
class index extends PureComponent {
  componentDidMount() {
    Object.assign(window.shareData, {
      url: `${location.origin}${location.pathname}#/`,
      link: `${location.origin}${location.pathname}#/`,
    });
  }
  gotoRecord = (activityId) => {
    showRecordDialog({
      onOk: () => {
        this.props.history.push(`/record?activityId=${activityId}`);
      },
    });
  };
  downloadApp = () => {
    showDownloadDialog({
      type: 7,
      url: location.href,
    });
  };
  renderOperation = (props = {}) => (
    <div styleName="operation">
      <div styleName="btn" onClick={this.gotoRecord.bind(null, ProgramType.COVER)} {...props}>
        参与翻唱
      </div>
      <div styleName="btn" onClick={this.gotoRecord.bind(null, ProgramType.TALK)} {...props}>
        参与说说
      </div>
    </div>
  );
  render() {
    const { ua } = this.props;
    return (
      <div styleName="page--index">
        <a href="#" styleName="btn-guanzhu"></a>
        {/**<img src={logo} alt="logo" styleName="logo" />**/}
        <div styleName="kol--container">
          <Kol data={{
            file: 'http://cdn5.lizhi.fm/audio/2019/07/14/2748477102085197318_hd.mp3',
            id: 'kol00'
          }} />
        </div>
        <div styleName="activity-detail" onClick={showDetailDialog} />
        <div styleName="saicheng" />
        <div styleName="rank">
          <Rank />
          {ua.isLizhiFM || ua.isWeiXin ? (
            <WithLoginBtn render={this.renderOperation} />
          ) : (
              this.renderOperation({ onClick: this.downloadApp })
            )}
        </div>
        <Link styleName="btn-appointment" to="/info">
          预约试驾
        </Link>
      </div>
    );
  }
}

export default index;
