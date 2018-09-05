import sample from 'lodash/sample';

export const cookiePrefix = 'base_cityfm_campus_line_';
export const tokenKey = `${cookiePrefix}token`;

export const wxJsConfUrl = '//oauthbiz.lizhi.fm/weixin/jsconfig?tag=cityfm';
export const wxAuthUrl = '//oauthbiz.lizhi.fm/weixin/wechatAuth?tag=cityfm';
export const wbAuthUrl = '//oauthbiz.lizhi.fm/weixin/auth?tag=cityfm';
export const lzAuthUrl = 'https://h5security.lizhi.fm/jsBridgeConfig/get';
export const fundebugApiKey = '294a8593da2207207c592dcd7364e84e913b366ca32bd592002dfc068c568f58';
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
