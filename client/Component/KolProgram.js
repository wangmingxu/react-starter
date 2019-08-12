import React from 'react';
import Program from './Program';
import { AudioStatus } from '@lz-component/Player';
import '../styles/kol-program.less';

class KolProgram extends Program {
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
          <div styleName="btn-control play" />
          <img src={data.coverThumb} styleName="avatar" alt="" />
        </div>
        <div styleName="name">{data.name}</div>
      </div>
    );
  }
}

export default KolProgram;
