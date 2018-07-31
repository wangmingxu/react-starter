import btnPlay1 from 'assets/loveletter/btn-play-part1.png';
import btnPlay2 from 'assets/loveletter/btn-play-part2.png';
import btnPlay4 from 'assets/loveletter/btn-play-part4.png';
import ActiveStar1 from 'assets/loveletter/star-active-part1.png';
import ActiveStar2 from 'assets/loveletter/star-active-part2.png';
import ActiveStar3 from 'assets/loveletter/star-active-part3.png';
import ActiveStar4 from 'assets/loveletter/star-active-part4.png';
import audio1 from 'assets/audio/1.mp3';
import audio2 from 'assets/audio/2.mp3';
import audio3 from 'assets/audio/3.mp3';
import audio4 from 'assets/audio/4.mp3';
import audio5 from 'assets/audio/5.mp3';
import audio6 from 'assets/audio/6.mp3';
import audio7 from 'assets/audio/7.mp3';
import audio8 from 'assets/audio/8.mp3';
import audio9 from 'assets/audio/9.mp3';
import audio10 from 'assets/audio/10.mp3';
import audio11 from 'assets/audio/11.mp3';
import audio12 from 'assets/audio/12.mp3';


export const playBtnArr = [btnPlay1, btnPlay2, btnPlay2, btnPlay4];
export const starArr = [ActiveStar1, ActiveStar2, ActiveStar3, ActiveStar4];

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

export const kolMap = [
  {
    audioUrl: audio1,
    text: '来自诗歌岛用户@流马的情书<br/>----荔枝主播@薄荷微凉-小糖 FM13593倾声演绎',
    flirt: 4,
    touching: 5,
    defeat: 2333,
  },
  {
    audioUrl: audio2,
    text: '来自喜茶用户@栖檀w的声音情书<br/>----荔枝主播@男伤音 FM789517倾声演绎',
    flirt: 5,
    touching: 5,
    defeat: 520,
  },
  {
    audioUrl: audio3,
    text: '来自冷兔用户@依赖成罪°的声音情书<br/>荔枝主播@NJ苏木 FM187702倾声演绎',
    flirt: 5,
    touching: 4,
    defeat: 666,
  },
  {
    audioUrl: audio4,
    text: '来自三明治用户@苏婕的声音情书<br/>----荔枝主播@一念.猫叔 FM87913742倾声演绎',
    flirt: 4,
    touching: 4,
    defeat: 666,
  },
  {
    audioUrl: audio5,
    text: '来自开始吧用户@菠萝的声音情书<br/>----荔枝主播@清魄 FM1548108倾声演绎',
    flirt: 4,
    touching: 4,
    defeat: 520,
  },
  {
    audioUrl: audio6,
    text: '来自江小白用户@Doraemon的声音情书<br/>----荔枝主播@南熙 FM34276815倾声演绎',
    flirt: 5,
    touching: 5,
    defeat: 2333,
  },
  {
    audioUrl: audio7,
    text: '来自概率论用户@安柔的声音情书<br/>荔枝主播@雷鸣 FM1871514倾声演绎',
    flirt: 4,
    touching: 4,
    defeat: 1314,
  },
  {
    audioUrl: audio8,
    text: '来自概率论用户@刺槐少女的声音情书<br/>----荔枝主播@宇薇 FM2794135倾声演绎',
    flirt: 5,
    touching: 5,
    defeat: 1314,
  },
  {
    audioUrl: audio9,
    text: '来自江小白用户@小洁几的声音情书<br/>----荔枝主播@雲兮 FM48056459倾声演绎',
    flirt: 5,
    touching: 5,
    defeat: 2333,
  },
  {
    audioUrl: audio10,
    text: '来自概率论用户@木林森的声音情书<br/>荔枝主播@背着吉他的蝙蝠女侠 FM18084倾声演绎',
    flirt: 4,
    touching: 4,
    defeat: 1314,
  },
  {
    audioUrl: audio11,
    text: '来自字媒体用户@醉卧沙场的声音情书<br/>荔枝主播@鱼骨头 FM64860507倾声演绎',
    flirt: 4,
    touching: 5,
    defeat: 666,
  },
  {
    audioUrl: audio12,
    text: '来自字媒体用户@王曼的声音情书<br/>荔枝主播@阿金姑娘 FM1680635倾声演绎',
    flirt: 5,
    touching: 4,
    defeat: 520,
  },
];
