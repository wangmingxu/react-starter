import shareCover from './assets/share_cover.jpg';

export { default as defaultAvatar } from 'assets/campus-line/avatar-default.png';

export const coverActivityName = 'toyota-test1'; // TODO: 改用线上活动
export const talkActivityName = 'gushidasai'; // TODO: 改用线上活动
export const cookiePrefix = `commonvote_${coverActivityName}_`;
export const tokenKey = `${cookiePrefix}wxid`;
export const lzTokenKey = `${cookiePrefix}token`;
export const syncCookiePrefix = `commonvote_${talkActivityName}_`;
export const syncTokenKey = `${syncCookiePrefix}wxid`;
export const lzSyncTokenKey = `${syncCookiePrefix}token`;

export const wxJsConfUrl = '//oauthbiz.lizhi.fm/weixin/jsconfig?tag=brand';
export const wxAuthUrl = '//oauthbiz.lizhi.fm/weixin/auth?tag=advert';
export const lzAuthUrl = 'https://h5security.lizhi.fm/jsBridgeConfig/get';
export const fundebugApiKey = 'ffdb03fb7c9c8ce72814900e613a28cd23619544901cddb9bb5760238658af61';
export const baiduTongjiID = '8623977c9cb6885ce12906b6b2d44b7b';

export const baseUrlPath = process.env.NODE_ENV === 'production' ? '/newvoice' : '/';

export const ProgramType = {
  COVER: 47, // TODO: 改用线上活动
  TALK: 45,
};

export const getDefaultShareData = () => ({
  url: `${location.origin}${location.pathname}#/`,
  link: `${location.origin}${location.pathname}#/`,
  title: '',
  desc: '',
  'image-url': shareCover,
  imgUrl: shareCover,
});

export const getSchoolShareData = id => ({
  url: id ? `${location.origin}${location.pathname}#/school/${id}` : location.href,
  link: id ? `${location.origin}${location.pathname}#/school/${id}` : location.href,
  title: '荔枝高校新声榜火热开战，我的社团差你一票！',
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
