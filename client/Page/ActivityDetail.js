import React from 'react';
import Banner from 'Component/Banner';
import '../styles/activity-detail.less';

const ActivityDetail = () => (
  <div styleName="page-activity_detail">
    <Banner logo detail={false} />
    <div styleName="card">
      <div styleName="title">活动时间</div>
      <div>9月X号——9月Y号</div>
      <div styleName="title">获得新声值的方式</div>
      <div>每日登陆每天进入活动榜单，可获100贡献值</div>
      <div styleName="title">参与上传</div>
      <div>
        (参与录音不仅可获取新声值同时默认参 与最美新声榜单活动)
        每天首次参与上传录音，可获50贡献值 邀请朋友一起来贡献转发1次获10贡献值，
        用户每天分享最高可得100贡献值 注：每天贡献值不回收，贡献次数不限。
      </div>
    </div>
  </div>
);

export default ActivityDetail;
