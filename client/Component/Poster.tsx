import avatar from '@/assets/avatar';
import heart from '@/assets/voicereport/icon-heart.png';
import bottomBar from '@/assets/voicereport/poster-bar.png';
import qrcodeWX from '@/assets/voicereport/qrcode-wx.png';
import rocker from '@/assets/voicereport/rocker.png';
import { voiceToneMap, voiceTpmMap } from '@/constant';
import { IResult, IUserInfo } from '@/types';
import React, { memo } from 'react';
import '../styles/poster.less';

interface IProps {
    displayType: 'dom' | 'img'
    reportData: IResult
    userInfo: IUserInfo
}

export default memo((props: IProps) => {
  const { displayType, reportData, userInfo } = props;
  return (
    <div styleName="poster" key="poster" id="poster" data-display={displayType}>
      <div styleName="title">
        {userInfo.name}<br /> 专属声音气质报告
      </div>
      <div styleName="avatar-wrapper">
        <img styleName="rocker" src={rocker} alt="rocker" />
        {reportData.voiceMan.voiceType ? (<img styleName="avatar" alt="avatar" src={avatar[reportData.voiceMan.voiceType - 1]} />) : null}
      </div>
      <div styleName="prop-list">
        <div styleName="item">
          <div styleName="label">音色属性：</div>
          <div styleName="value">
            {voiceToneMap[reportData.voiceMan.voiceType - 1]} ─── <span styleName="simliar">{`${reportData.voiceMan.voiceTypeVal}%`}</span>
          </div>
        </div>
        <div styleName="item">
          <div styleName="label">相似人物：</div>
          <div styleName="value">{reportData.voiceMan.similarityPerson}</div>
        </div>
        <div styleName="item">
          <div styleName="label">心动指数：</div>
          <div styleName="value">
            {Array(reportData.voiceMan.voiceStar).fill({}).map((item, i) => (<img src={heart} alt="heart" styleName="heart" key={i} />))}
          </div>
        </div>
        <div styleName="item">
          <div styleName="label">攻受属性：</div>
          <div styleName="value">{reportData.voiceMan.semeVal === 1 ? '攻' : '受'}</div>
        </div>
      </div>
      <div styleName="tone-panl">
        <div styleName="panl-title">音色气质</div>
        <div styleName="panl-content">
          {reportData.voiceMan.voiceType ? (<div styleName="text" dangerouslySetInnerHTML={{__html: voiceTpmMap[`${reportData.voiceMan.voiceType}`][reportData.voiceMan.temperament]}} />) : null}
        </div>
      </div>
      <div styleName="best-partner">
          最佳伴侣<span styleName="dot">·</span>{voiceToneMap[reportData.voiceMan.matchType - 1]}
      </div>
      <div styleName="bottom-bar">
        <img src={bottomBar} alt="bottom-bar" styleName="bg" />
        <img src={qrcodeWX} alt="qrcode" styleName="qrcode" />
      </div>
    </div>
  );
});