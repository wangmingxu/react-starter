import React, { Component } from 'react'
import classNames from 'classnames'
import Program from '@/Component/Program'
import '../styles/rank.less'

export default class Rank extends Component {
    state = {
        tabs: [
            { name: '最热翻唱', id: 0 },
            { name: '最热说说', id: 1 },
            { name: '我的音频', id: 2 },
        ],
        currentTab: 0,
        list: [
            {
                "uid": "ocWNev34P4yxSfjmprst-Mjr8PvY",
                "contributeTime": "1498442685563",
                "status": "0",
                "coverThumb": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM6ytpQ7WFWdbklXoSXsLL268gYrlfXIeOknwYTAC2R1nbp2owHh44oeqLbEpQb7XIT1Xic7ttfNAdtJyasq3Eia0S6qf02VL72Gk/0",
                "vote": "2222",
                "aid": "4",
                "type": "wx",
                "id": "1338",
                "duration": "7",
                "nickName": "Maggie",
                "file": "http://bizcdn.lizhi.fm/static/static/advert/commonvote/audio/2017_06_26_10_04_45_JRYxcY3XDgwPYynH178h9trqKUmfAWZb6Q3q5ku8c9rdB763YRoea-ZzRQeW6M9s.m4a",
                "name": "#遇见蔡健雅#彭彭",
                "the_jump_url": "https://m.lizhi.fm/vod/null/null"
            },
            {
                "uid": "ocWNev3pNzd86esqI78AIqIbZ1GQ",
                "contributeTime": "1498226985177",
                "status": "0",
                "coverThumb": "http://wx.qlogo.cn/mmopen/o2lU7jqYvTWuY9icEZQUVVC3MQIbtXeaI8SDEZHBBCldrPjf6x6iaKiaYDu837McDuQz2eZeBeFFyFHibFMb1nMfvWW8jfZnDhca/0",
                "vote": "1128",
                "aid": "4",
                "type": "wx",
                "id": "993",
                "duration": "36",
                "nickName": "Tanya Fish",
                "file": "http://bizcdn.lizhi.fm/static/static/advert/commonvote/audio/2017_06_23_22_09_45_ER80C_V3Jz5daXPtp47Ew402C3h6kMUhG8wsPPFOOsnLwaAhziD0KAiyL3OrfSoV.m4a",
                "name": "#遇见蔡健雅#",
                "the_jump_url": "https://m.lizhi.fm/vod/null/null"
            },
            {
                "uid": "ocWNev2Lj5u5NPnijzxgCqeejSog",
                "contributeTime": "1498040303800",
                "status": "0",
                "coverThumb": "http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0",
                "vote": "772",
                "aid": "4",
                "type": "wx",
                "id": "31",
                "duration": "6",
                "nickName": "鸽子☔",
                "file": "http://bizcdn.lizhi.fm/static/static/advert/commonvote/audio/2017_06_21_18_18_23_a90M6yuCCbfKZCmWGRYYJOQUbg8awFXsZ4Pqkwks7KTn6G9UgexI_NbOaVqUcMZq.m4a",
                "name": "#遇见蔡健雅#其实很简单",
                "the_jump_url": "https://m.lizhi.fm/vod/null/null"
            },
            {
                "uid": "ocWNev6FwyMe6LWaDROioGvq3eqw",
                "contributeTime": "1498319596279",
                "status": "0",
                "coverThumb": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM6SXD9bguemsDp2aicbiaf5UicjbSXFQBkZEbfe1u0y20HfxGIPPCZMVp86TXaHSO9ZRU3AOEh55xrNf08CAHckqtFfCiaw5R0iarSA/0",
                "vote": "523",
                "aid": "4",
                "type": "wx",
                "id": "1217",
                "duration": "53",
                "nickName": "列穆尼亚tanya",
                "file": "http://bizcdn.lizhi.fm/static/static/advert/commonvote/audio/2017_06_24_23_53_16_6bxDs6rcrc3IUgttjRgKgrth6JNLtenSOkb_J9qzxAgIP6nrtofH5rUCjY95LXzO.m4a",
                "name": "#遇见蔡健雅#",
                "the_jump_url": "https://m.lizhi.fm/vod/null/null"
            },
            {
                "uid": "ocWNevyTBV6hpy8gPp8iR_Q8u0gg",
                "contributeTime": "1498436943535",
                "status": "0",
                "coverThumb": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLBv1XNTCnwgqe8jDedXZlleKuwdgz3lGZDUXS7DmibmyQ4ian56yzHSEZpJCzjW2tkfquCVW9fpMlh85TFvKUS5gePEBdfUOpP90/0",
                "vote": "451",
                "aid": "4",
                "type": "wx",
                "id": "1332",
                "duration": "60",
                "nickName": "小爷",
                "file": "http://bizcdn.lizhi.fm/static/static/advert/commonvote/audio/2017_06_26_08_29_03_lKgcO0lZEyi4xLRvRe-7HVOrJAWGA0jSvSYOG4yTqyk_BkuVPv1kNI4XzEJC9xc8.m4a",
                "name": "#遇见蔡健雅#",
                "the_jump_url": "https://m.lizhi.fm/vod/null/null"
            },
            {
                "uid": "ocWNev49bBNcrFj0ZEmz4-bdUk4I",
                "contributeTime": "1498321264032",
                "status": "0",
                "coverThumb": "http://wx.qlogo.cn/mmopen/ibmUq6gcQH1bAEPaQia0wJFfGYNMsFL8MtxKWxbtmYG81xY44pO2wkdZjyF0Fa3anIibREMEgXutPdpBYBmfepj7JGibOUbZsDhx/0",
                "vote": "219",
                "aid": "4",
                "type": "wx",
                "id": "1228",
                "duration": "12",
                "nickName": "小鱼干憨憨🎣",
                "file": "http://bizcdn.lizhi.fm/static/static/advert/commonvote/audio/2017_06_25_00_21_04_1oXVUzPh3J4ppAaD2fKhJgUYps_pKKuDBI-rk1b_gw5a5k0fkh_UQjKaIHCU0yhL.m4a",
                "name": "#遇见蔡健雅#",
                "the_jump_url": "https://m.lizhi.fm/vod/null/null"
            },
            {
                "uid": "ocWNev4eLdRR7Bjr7LFf-UDH0NBA",
                "contributeTime": "1498538721906",
                "status": "0",
                "coverThumb": "http://wx.qlogo.cn/mmopen/o2lU7jqYvTVRrsBjw6xeHBQKZKKqCUSQxKu86S70nNrx5pVzQchOjrnhBiaNImRcR3DLeLYljvYpwdSvtIQKW3JNNztqMDB75/0",
                "vote": "152",
                "aid": "4",
                "type": "wx",
                "id": "1405",
                "duration": "10",
                "nickName": "Sener",
                "file": "http://bizcdn.lizhi.fm/static/static/advert/commonvote/audio/2017_06_27_12_45_21_8V95G3YQQKjVzV1klmPTwHnopOG2xhXKN8aJiPwn7uozc4Aj29tcv_LQyivZ2y3G.m4a",
                "name": "#遇见蔡健雅#",
                "the_jump_url": "https://m.lizhi.fm/vod/null/null"
            },
            {
                "uid": "ocWNev5SwsCacqeWNdhwYPGrTXCk",
                "contributeTime": "1497880509399",
                "status": "0",
                "coverThumb": "http://wx.qlogo.cn/mmopen/PiajxSqBRaEIkkngPKicdBjDxqBUcfUNzVzC5Yx2kkAKsuK13xLfWA3iauP3g6ic3bPLwMlokJ0vE8TTxmRibZ7VFug/0",
                "vote": "104",
                "aid": "4",
                "type": "wx",
                "id": "16",
                "duration": "5",
                "nickName": "潇潇",
                "file": "http://bizcdn.lizhi.fm/static/static/advert/commonvote/audio/2017_06_19_21_55_09_wg69XdJidWRapYC6HzwrXnZkgbIaviR95zwKMuMW0Qy3ojnx9gl2j4ci-KBswUzL.m4a",
                "name": "#遇见蔡健雅#",
                "the_jump_url": "https://m.lizhi.fm/vod/null/null"
            },
            {
                "uid": "ocWNev_IIFELVaY6fbyWjQ0Yc88k",
                "contributeTime": "1497880407642",
                "status": "0",
                "coverThumb": "http://wx.qlogo.cn/mmopen/R6jgx5LDZpGT0ZFu1XCiaUsbeCLA0yhXdTpR5z5EN67icglzXuP3mJIXdgb80zdVmIPArb5kQvS2OwzUk1TVwgicNOYhpPTmlia3/0",
                "vote": "27",
                "aid": "4",
                "type": "wx",
                "id": "15",
                "duration": "6",
                "nickName": "林默默",
                "file": "http://bizcdn.lizhi.fm/static/static/advert/commonvote/audio/2017_06_19_21_53_27_X6EyBn9WvOclnd9DJXMj3ON_7PMkKF6dbCAvYP54kbwMiQClSVGwf5VKF-p1dObU.m4a",
                "name": "#遇见蔡健雅#",
                "the_jump_url": "https://m.lizhi.fm/vod/null/null"
            },
            {
                "uid": "ocWNev2ROUrkvELeUz_cIi8MhV0Q",
                "contributeTime": "1498320914665",
                "status": "0",
                "coverThumb": "http://wx.qlogo.cn/mmopen/R6jgx5LDZpGT0ZFu1XCiaUiaCpU6oic1Qweaic8qc7VibFDSQ9bicUyIMia6aPPZ5Z152bIvMkzL28e2MJl1Z6ZcYNDWUbYHajZL17S/0",
                "vote": "19",
                "aid": "4",
                "type": "wx",
                "id": "1225",
                "duration": "27",
                "nickName": "梦醉易碎*",
                "file": "http://bizcdn.lizhi.fm/static/static/advert/commonvote/audio/2017_06_25_00_15_14_Va7-s345YkGMeI45baVMa55ThJcRhC-DBwjuS8mKP4sSReZAXVEGiF0CLL4Rh1yD.m4a",
                "name": "#遇见蔡健雅#",
                "the_jump_url": "https://m.lizhi.fm/vod/null/null"
            }
        ]
    }
    changeTab = (id) => {
        this.setState({ currentTab: id })
    }
    render() {
        const { list, currentTab, tabs } = this.state;
        return (
            <div>
                <div styleName="tabs">
                    {tabs.map(item => (
                        <div
                            styleName={classNames("item", {
                                active: currentTab === item.id
                            })}
                            key={item.id}
                            onClick={this.changeTab.bind(null, item.id)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
                <div styleName="tit">
                    <div styleName="rank-txt">
                        排行榜
                    </div>
                    <div styleName="votes">
                        可用票数：20
                    </div>
                </div>
                <div styleName="rank-list">
                    {list.map(item => (<Program data={item} key={item.id} />))}
                </div>
            </div>
        )
    }
}
