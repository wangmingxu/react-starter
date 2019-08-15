import React from 'react';
import { SuperProgram } from './Program';
import { AudioStatus } from '@lz-component/Player';
import '../styles/kol-program.less';

class KolProgram extends SuperProgram {
  render() {
    const { data } = this.props;
    const { playStatus, playId } = this.state;
    return (
      <div styleName="kol-program">
        <div styleName="avatar-wrapper">
          {playStatus === AudioStatus.PLAYING && playId === data.id ? (
            <div styleName="btn-control pause" onClick={this.pause} />
          ) : (
              <div styleName="btn-control play" onClick={this.play} />
            )}
          <img src={data.coverThumb} styleName="avatar" alt="" />
        </div>
        <div styleName="name">{data.name}</div>
        <div styleName="desc">{data.desc}</div>
      </div>
    );
  }
}

export default KolProgram;
