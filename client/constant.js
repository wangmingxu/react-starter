export const cookiePrefix = 'base_cityfm_hangzhou_single_dog_';
export const tokenKey = `${cookiePrefix}token`;
export const idKey = `${cookiePrefix}id`;
export const wxidKey = `${cookiePrefix}wxid`;
export const wbidKey = `${cookiePrefix}wbid`;

export const wxJsConfUrl = '//oauthbiz.lizhi.fm/weixin/jsconfig?tag=brand';
export const wxAuthUrl = '//oauthbiz.lizhi.fm/weixin/wechatAuth?tag=brand';
export const lzAuthUrl = 'https://h5security.lizhi.fm/jsBridgeConfig/get';
export const fundebugApiKey = '294a8593da2207207c592dcd7364e84e913b366ca32bd592002dfc068c568f58';
export const baiduTongjiID = '50f7f3f779102291f22b776ad51e5893';

export const baseUrlPath = process.env.NODE_ENV === 'production' ? '/hangzhou/singleDog' : '/';
