import React from 'react';
import Banner from 'Component/Banner';
import '../styles/activity-detail.less';

const ActivityDetail = () => (
  <div styleName="page-activity_detail">
    <Banner logo detail={false} />
    <div styleName="card">
      <div styleName="title">活动时间</div>
      <div styleName="center desc">9月10号——9月25号</div>
      <div styleName="title">获得新声值的方式</div>
      <div styleName="title">每日登陆</div>
      <div styleName="center desc">每天登录荔枝APP，进入活动页面，可获100贡献值</div>
      <div styleName="title">参与上传</div>
      <div styleName="desc">每天登录荔枝APP，首次参与上传录音，可获50贡献值</div>
      <div styleName="title">邀请朋友一起来贡献</div>
      <div styleName="desc">
      荔枝APP内，转发1次获10贡献值，每天分享最高可得100贡献值<br />
      注：每天贡献值不回收，贡献次数不限
      </div>
      <div styleName="title">高校热度榜奖励</div>
      <div styleName="desc">
        高校新声榜冠军：3000元现金+荔枝高校优秀合作伙伴牌匾/奖杯
        <br />
        高校新声榜亚军：2000元现金+荔枝高校优秀合作伙伴牌匾/奖杯
        <br />
        高校新声榜季军：1000元现金+荔枝高校优秀合作伙伴牌匾/奖杯
        <br />
        高校新声榜4—10名：价值300元荔枝周边+荔枝优秀伙伴合作证书
        <br />
        （参与打榜学校贡献值超过20000即可获得荔枝高校官方播客认证）
        <br />
      </div>
      <div styleName="title">个人新声榜奖励</div>
      <div styleName="desc">个人新声榜前三名：各1000元现金+荔枝签约主播机会+荔枝百万推广资源</div>
      <div styleName="title">学校榜单排名</div>
      <div styleName="center desc">学校获取新声值与该校所有新声获取新声值相加排名</div>
      <div styleName="title">个人榜单排名</div>
      <div styleName="center desc">所有学校个人获取新声值总排名</div>
      <div styleName="desc">你的学校没在榜上？<br />欢迎大高校积极参与<br />联系QQ：<a styleName="qq">3002820959</a>推荐你的学校<br />不要错过这个向全世界安利的机会哦！</div>
    </div>
  </div>
);

export default ActivityDetail;
