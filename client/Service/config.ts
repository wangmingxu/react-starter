import shareCover from '@/assets/share_cover.jpg';
import { IConfig } from '@lz-service/ConfigService';

const config: IConfig = {
    tokenKey: 'base_voicereport_token',
    wxJsConfUrl: '//h5.lizhi.fm/getJSConfig',
    lzJsConfUrl: '//h5security.lizhi.fm/jsBridgeConfig/get',
    shareInfo: {
        link: location.href.replace(location.hash, '').replace('voicecard.lizhifm.com', 'h5.lizhi.fm'),
        title: '震惊！声音出卖你的颜值啦！',
        desc: '声音黑科技，5秒暴露你的迷人气质！',
        imgUrl: `${location.origin}${shareCover}`,
    },
}

export default config;