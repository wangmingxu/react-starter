import React, { Component } from 'react';
import zhubo1 from '@/assets/toyota/zhubo-1.png';
import zhubo2 from '@/assets/toyota/zhubo-2.png';
import zhubo3 from '@/assets/toyota/zhubo-3.png';
import KolProgram from './KolProgram';
import '../styles/kol.less';

export default class Kol extends Component {
  state = {
    list: [
      {
        name: 'ECHO任小珺',
        coverThumb: zhubo3,
        file: '',
        id: 'kol01',
      },
      {
        name: '夏忆',
        coverThumb: zhubo2,
        file: '',
        id: 'kol02',
      },
      {
        name: '楠小点',
        coverThumb: zhubo1,
        file: '',
        id: 'kol03',
      },
    ],
  };
  render() {
    const { list } = this.state;
    return (
      <div styleName="kol">
        <div styleName="title" />
        <div styleName="list">
          {list.map((item, i) => (
            <KolProgram key={i} data={item} />
          ))}
        </div>
        <div styleName="audio">
          <div styleName="play-btn" />
          <div styleName="name">My Way</div>
          <div styleName="graph" />
        </div>
      </div>
    );
  }
}
