import React from 'react';
import zhubo1 from '@/assets/toyota/zhubo-1.png';
import zhubo2 from '@/assets/toyota/zhubo-2.png';
import zhubo3 from '@/assets/toyota/zhubo-3.png';
import KolProgram from './KolProgram';
import { SuperProgram } from './Program'
import { AudioStatus } from '@lz-component/Player';
import '../styles/kol.less';

export default class Kol extends SuperProgram {
  state = {
    list: [
      {
        name: 'ECHO任小珺',
        coverThumb: zhubo3,
        file: 'http://cdn5.lizhi.fm/audio/2019/07/14/2748477102085197318_hd.mp3',
        id: 'kol01',
        desc: '荔枝著名音乐主播'
      },
      {
        name: '夏忆',
        coverThumb: zhubo2,
        file: 'http://cdn5.lizhi.fm/audio/2019/07/14/2748514254967683590_hd.mp3',
        id: 'kol02',
        desc: '荔枝人气情感主播'
      },
      {
        name: '楠小点',
        coverThumb: zhubo1,
        file: 'http://cdn5.lizhi.fm/audio/2019/07/14/2748503227945553414_hd.mp3',
        id: 'kol03',
        desc: '荔枝金牌音乐主播'
      },
    ],
  };
  render() {
    const { list, playStatus, playId } = this.state;
    const { data } = this.props;
    return (
      <div styleName="kol">
        <div styleName="title" />
        <div styleName="list">
          {list.map((item, i) => (
            <KolProgram key={i} data={item} />
          ))}
        </div>
        <div styleName="audio">
          {playStatus === AudioStatus.PLAYING && playId === data.id ? (
            <div styleName="pause-btn" onClick={this.pause} />
          ) : (
              <div styleName="play-btn" onClick={this.play} />
            )}
          <div styleName="name">My Way</div>
          <div styleName="graph" />
        </div>
      </div>
    );
  }
}
