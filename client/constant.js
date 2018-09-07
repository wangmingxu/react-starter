import sample from 'lodash/sample';
import shareCover from './assets/share_cover.jpg';

export const cookiePrefix = 'base_cityfm_campus_line_';
export const tokenKey = `${cookiePrefix}token`;

export const wxJsConfUrl = '//oauthbiz.lizhi.fm/weixin/jsconfig?tag=brand';
export const wxAuthUrl = '//oauthbiz.lizhi.fm/weixin/wechatAuth?tag=brand';
export const lzAuthUrl = 'https://h5security.lizhi.fm/jsBridgeConfig/get';
export const fundebugApiKey = 'ffdb03fb7c9c8ce72814900e613a28cd23619544901cddb9bb5760238658af61';
export const baiduTongjiID = '50f7f3f779102291f22b776ad51e5893';

export const baseUrlPath = process.env.NODE_ENV === 'production' ? '/newvoice' : '/';

export const ProgramType = {
  SCHOOL: 1,
  PERSONAL: 2,
};

export const recordText = sample([
  '说下你的军训感受，如：军训的太阳好晒，像后羿射日那天一样晒，嘤嘤嘤',
  '说下开学的新鲜事，如：到校的第一天是隔壁专业超帅的学长帮忙搬的行李，开森！',
  '说下你想加入的社团，如：我的声音这么好听，以后想当专业主播，当然要加入广播台啦！',
  '说下你对大学的憧憬，如：我希望可以顺利过4&6级、不挂科、拿奖学金，走上人生巅峰！',
  '说下你对大学的憧憬，如：我希望可以在大学谈一场难忘的恋爱，在操场牵着手一圈圈散步。',
]);

export const noticeText = '贡献你的新声，为社团加油助力；每天首次登录活动页面可获得100贡献值；每天首次发布节目可获得50贡献值；每天前10次转发，每次可获得10贡献值。';

export const getDefaultShareData = () => ({
  url: `${location.origin}${location.pathname}#/`,
  link: `${location.origin}${location.pathname}#/`,
  title: '荔枝高校新声榜火热开战，最美新声等你pick',
  desc: '好声音成就大梦想，全国寻找最美新声，让全校听见你的声音',
  'image-url': shareCover,
  imgUrl: shareCover,
});

export const getSchoolShareData = id => ({
  url: id ? `${location.origin}${location.pathname}#/school/${id}` : location.href,
  link: id ? `${location.origin}${location.pathname}#/school/${id}` : location.href,
  title: '我的社团正在参加荔枝年度高校新生榜活动，就差你一票啦',
  desc: '好声音成就大梦想，来为我的社团贡献助力，赢得高校荣誉！',
  'image-url': shareCover,
  imgUrl: shareCover,
});

export const getPersonShareData = id => ({
  url: id ? `${location.origin}${location.pathname}#/voice/${id}` : location.href,
  link: id ? `${location.origin}${location.pathname}#/voice/${id}` : location.href,
  title: '我正在参加荔枝年度寻找最美新声活动，就差你一票啦',
  desc: '好声音成就大梦想，来为我贡献助力，赢得新声荣誉！',
  'image-url': shareCover,
  imgUrl: shareCover,
});
