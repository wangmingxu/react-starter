import React, { Component } from 'react'
import zhubo1 from '@/assets/toyota/zhubo-1.png';
import zhubo2 from '@/assets/toyota/zhubo-2.png';
import zhubo3 from '@/assets/toyota/zhubo-3.png';
import '../styles/kol.less'

export default class Kol extends Component {
    state = {
        list: [
            {
                name: 'ECHO任小珺',
                avatar: zhubo3,
                audioUrl: ''
            },
            {
                name: '夏忆',
                avatar: zhubo2,
                audioUrl: ''
            },
            {
                name: '楠小点',
                avatar: zhubo1,
                audioUrl: ''
            }
        ]
    }
    render() {
        const { list } = this.state;
        return (
            <div styleName="kol">
                <div styleName="title" />
                <div styleName="list">
                    {list.map((item, i) => (<div styleName="item" key={item.id}>
                        <img src={item.avatar} styleName="avatar" />
                        <div styleName="name">{item.name}</div>
                    </div>))}
                </div>
                <div styleName="audio">
                    <div styleName="play-btn"></div>
                    <div styleName="name">My Way</div>
                    <div styleName="graph"></div>
                </div>
            </div>
        )
    }
}
