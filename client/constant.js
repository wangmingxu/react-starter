import shuffle from 'lodash/shuffle';
import btnPlay1 from 'assets/loveletter/btn-play-part1.png';
import btnPlay2 from 'assets/loveletter/btn-play-part2.png';
import btnPlay4 from 'assets/loveletter/btn-play-part4.png';
import posterPlatBtn1 from 'assets/loveletter/poster-btn-play-part1.png';
import posterPlatBtn2 from 'assets/loveletter/poster-btn-play-part2.png';
import posterPlatBtn4 from 'assets/loveletter/poster-btn-play-part4.png';
import ActiveStar1 from 'assets/loveletter/star-active-part1.png';
import ActiveStar2 from 'assets/loveletter/star-active-part2.png';
import ActiveStar3 from 'assets/loveletter/star-active-part3.png';
import ActiveStar4 from 'assets/loveletter/star-active-part4.png';
import DefaultAvatar from 'assets/loveletter/default-avatar.png';
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
export const posterPlayBtnArr = [posterPlatBtn1, posterPlatBtn2, posterPlatBtn2, posterPlatBtn4];
export const starArr = [ActiveStar1, ActiveStar2, ActiveStar3, ActiveStar4];

export const cookiePrefix = 'base_brand_loveletter_';
export const tokenKey = `${cookiePrefix}token`;
export const idKey = `${cookiePrefix}id`;
export const wxidKey = `${cookiePrefix}wxid`;
export const wbidKey = `${cookiePrefix}wbid`;

export const wxJsConfUrl = '//oauthbiz.lizhi.fm/weixin/jsconfig?tag=brand';
export const wxAuthUrl = '//oauthbiz.lizhi.fm/weixin/wechatAuth?tag=brand';
export const lzAuthUrl = 'https://h5security.lizhi.fm/jsBridgeConfig/get';
export const fundebugApiKey = '2e02f23051e5a748593254ff6197e790b706b8291c203c0b126cf938c04ed5f0';
export const baiduTongjiID = 'cbe22ebe51187550de17b43160285bd2';

export const baseUrlPath = process.env.NODE_ENV === 'production' ? '/hangzhou/singleDog' : '/';

export const kolMap = shuffle([
  {
    image: DefaultAvatar,
    audio: audio1,
    textId: 20,
    lrNum: 4,
    clNum: 5,
    num: 2333,
  },
  {
    image: DefaultAvatar,
    audio: audio2,
    textId: 21,
    lrNum: 5,
    clNum: 5,
    num: 520,
  },
  {
    image: DefaultAvatar,
    audio: audio3,
    textId: 22,
    lrNum: 5,
    clNum: 4,
    num: 666,
  },
  {
    image: DefaultAvatar,
    audio: audio4,
    textId: 23,
    lrNum: 4,
    clNum: 4,
    num: 666,
  },
  {
    image: DefaultAvatar,
    audio: audio5,
    textId: 24,
    lrNum: 4,
    clNum: 4,
    num: 520,
  },
  {
    image: DefaultAvatar,
    audio: audio6,
    textId: 25,
    lrNum: 5,
    clNum: 5,
    num: 2333,
  },
  {
    image: DefaultAvatar,
    audio: audio7,
    textId: 26,
    lrNum: 4,
    clNum: 4,
    num: 1314,
  },
  {
    image: DefaultAvatar,
    audio: audio8,
    textId: 27,
    lrNum: 5,
    clNum: 5,
    num: 1314,
  },
  {
    image: DefaultAvatar,
    audio: audio9,
    textId: 28,
    lrNum: 5,
    clNum: 5,
    num: 2333,
  },
  {
    image: DefaultAvatar,
    audio: audio10,
    textId: 29,
    lrNum: 4,
    clNum: 4,
    num: 1314,
  },
  {
    image: DefaultAvatar,
    audio: audio11,
    textId: 30,
    lrNum: 4,
    clNum: 5,
    num: 666,
  },
  {
    image: DefaultAvatar,
    audio: audio12,
    textId: 31,
    lrNum: 5,
    clNum: 4,
    num: 520,
  },
]).map((item, i) => ({ theme: i % 4 + 1, ...item }));

export const letterText = [
  // 0-19 ugc音频文案
  { text: '都没说过话，第一句是我爱你…', from: '---来自好奇心日报用户@..的情书' },
  { text: '我爱你<br/>可以从你的全世界路过么<br/>打包带走你所有的好吃的', from: '---来自冷兔用户@依赖成罪°的情书' },
  { text: '深秋乔木叶如花， 倚窗凝望似金纱。 欲借远客来传语， 正是银杏铺满涯。', from: '---来自开始吧用户@菠萝的情书' },
  { text: '比心的话我的心估计比较可爱，<br/>因为有你在里面', from: '---来自喜茶用户@一只柴扉的情书' },
  { text: '要去鱼的肚子里游泳<br/>要去氧气分子里飞翔<br/>要去马背上疾驰<br/>要去梦里见你', from: '---来自三明治用户@陈巍月的情书' },
  { text: '我欣喜不安<br/>她恋爱中的笑扑打着我的窗<br/>我紧握防盗栏杆攀援生长<br/>她越是走远我越是茂盛', from: '---来自诗歌岛用户@小乘的情书' },
  { text: '你说，去哪里旅游，风景最好呢<br/>我说，你身边<br/>看你', from: '---来自言几又用户@韦建的情书' },
  { text: '我喜欢你的每一天，<br/>世间万物都与你相关。', from: '---来自江小白用户@Doraemon的情书' },
  { text: '假使我能解释一朵花为什么盛开<br/>一粒种子为什么发芽<br/>你就会知道我为什么爱你', from: '---来自言几又用户@一度灰的情书' },
  { text: '这是好人，这是坏人，你是我的心上人；<br/>这是瓜子，这是枣子，你将会是我的妻子。', from: '---来自字媒体用户@醉卧沙场的情书' },
  { text: '《我可能写了一首假诗》<br/>睡不着做了一个假梦<br/>梦见一个假你<br/>透露给我一个假秘密<br/>说几年前那次假表白<br/>你其实也是假拒绝<br/>这是关于你仅存的一段假回忆<br/>多年后，假装想你时<br/>足以流几滴假眼泪', from: '---来自诗歌岛用户@流马的情书' },
  { text: '人呐，大概只有两种事憋不住，一种是打喷嚏，另一种，你说呢？', from: '---来自字媒体用户@除却天边月的情书' },
  { text: '我觉得除了恋爱，咱们之间已经没什么好谈的了', from: '---来自字媒体用户@王曼的情书' },
  { text: '没有你的时候，生活是远方； <br/>有了你以后，远方是生活。', from: '---来自江小白用户@小洁几的情书' },
  { text: '想念是把自己打成结<br/>深夜飞机飞过时<br/>机舱上熟睡的面孔<br/>被星星窥视<br/>我借用星星的想象力<br/>将你的鞋带松绑<br/>看见你被时光绊倒<br/>路边的灰尘也打起喷嚏', from: '---来自三明治用户@苏婕的情书' },
  { text: '我拼命努力，你死不上进？拜拜，从此井水不犯神仙水。', from: '---来自才华有限青年的杨乐多的情书' },
  { text: '我做完阑尾手术回家你没问候过一句，半夜扳过我的身体还要啪啪啪。<br/>这次我打算割了你，就像割掉阑尾。', from: '---来自才华有限青年的杨乐多的情书' },
  { text: '你是乞力马扎罗山顶的雪，我是山脚下不知名农户家里炉灶上的一团火。你在我心里亘古不变，而我的爱生生不息。想你的时候，我就努力发热。', from: '---来自喜茶用户@栖檀w的情书' },
  { text: '《我期待的一些场景》<br/>我们无声并排坐<br/>你点起一根烟<br/>我凑上去，也把我的点燃<br/>在凉意袭来的秋夜里<br/>我靠在你的肩头<br/>数星星，然后把它们一颗颗都藏进<br/>我心里拟好的一些诗句里<br/>那些水波一样温柔的东西<br/>听你唱一些熟悉的歌<br/>然后跟着你哼唱<br/>到爱那个字时<br/>我看着你的侧脸<br/>刻意用力<br/>你揉了揉我的头发', from: '---来自三明治用户@陈巍月的情书' },
  { text: '过街时我怕车，想牵你。你甩开我说，太热了自己走。行，这辈子我都自己走吧。', from: '---来自才华有限青年的杨乐多的情书' },
  // 20-31 kol音频文案
  { text: '来自诗歌岛用户@流马的情书<br/>荔枝主播@薄荷微凉-小糖 FM13593倾声演绎', from: '---荔枝主播@薄荷微凉-小糖 FM13593倾声演绎' },
  { text: '来自喜茶用户@栖檀w的声音情书<br/>荔枝主播@男伤音 FM789517倾声演绎', from: '---荔枝主播@男伤音 FM789517倾声演绎' },
  { text: '来自冷兔用户@依赖成罪°的声音情书<br/>荔枝主播@NJ苏木 FM187702倾声演绎', from: '---荔枝主播@NJ苏木 FM187702倾声演绎' },
  { text: '来自三明治用户@苏婕的声音情书<br/>荔枝主播@一念.猫叔 FM87913742倾声演绎', from: '---荔枝主播@一念.猫叔 FM87913742倾声演绎' },
  { text: '来自开始吧用户@菠萝的声音情书<br/>荔枝主播@一念.猫叔 FM87913742倾声演绎', from: '---荔枝主播@清魄 FM1548108倾声演绎' },
  { text: '来自江小白用户@Doraemon的声音情书<br/>荔枝主播@南熙 FM34276815倾声演绎', from: '---荔枝主播@南熙 FM34276815倾声演绎' },
  { text: '来自概率论用户@安柔的声音情书<br/>荔枝主播@雷鸣 FM1871514倾声演绎', from: '---荔枝主播@雷鸣 FM1871514倾声演绎' },
  { text: '来自概率论用户@刺槐少女的声音情书<br/>荔枝主播@宇薇 FM2794135倾声演绎', from: '---荔枝主播@宇薇 FM2794135倾声演绎' },
  { text: '来自江小白用户@小洁几的声音情书<br/>荔枝主播@雲兮 FM48056459倾声演绎', from: '---荔枝主播@雲兮 FM48056459倾声演绎' },
  { text: '来自概率论用户@木林森的声音情书<br/>荔枝主播@背着吉他的蝙蝠女侠 FM18084倾声演绎', from: '---荔枝主播@背着吉他的蝙蝠女侠 FM18084倾声演绎' },
  { text: '来自字媒体用户@醉卧沙场的声音情书<br/>荔枝主播@鱼骨头 FM64860507倾声演绎', from: '---荔枝主播@鱼骨头 FM64860507倾声演绎' },
  { text: '来自字媒体用户@王曼的声音情书<br/>荔枝主播@阿金姑娘 FM1680635倾声演绎', from: '---荔枝主播@阿金姑娘 FM1680635倾声演绎' },
  // 分享情书文案
  { text: '用声音记录情书<br/>我爱你，也能有N种说法<br/>而我选了最甜最撩的那种' },
];

