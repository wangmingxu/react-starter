import React from 'react';
import '../styles/letter.less';
import classNames from 'classnames';
import Star from 'assets/loveletter/star.png';
import { playBtnArr, starArr } from 'constant';

const Letter = (props) => {
  const { theme } = props;
  return (
    <div styleName={classNames('book', `theme${theme}`)}>
      <img
        src="https://h5.lizhi.fm/static/voicereport/common/3.png"
        styleName="avatar"
        alt="avatar"
      />
      <div styleName="nickName">XXXX</div>
      <img styleName="btn-play" src={playBtnArr[theme - 1]} alt="play" />
      <div styleName="card">
                来自诗歌岛用户@流马的情书<br />—荔枝主播@薄荷微凉-小糖 FM13593倾声演绎
        <div styleName="defeat">你的声音情书已经成功撩了<span styleName="num">8888</span>个人</div>
      </div>
      <div styleName="voice-index">
        <div styleName="item">
          <div styleName="label">撩人指数：</div>
          <div styleName="val">
            <img src={starArr[theme - 1]} alt="star" styleName="star active" />
            <img src={starArr[theme - 1]} alt="star" styleName="star active" />
            <img src={starArr[theme - 1]} alt="star" styleName="star active" />
            <img src={starArr[theme - 1]} alt="star" styleName="star active" />
            <img src={Star} alt="star" styleName="star" />
          </div>
        </div>
        <div styleName="item">
          <div styleName="label">催泪指数：</div>
          <div styleName="val">
            <img src={starArr[theme - 1]} alt="star" styleName="star active" />
            <img src={starArr[theme - 1]} alt="star" styleName="star active" />
            <img src={starArr[theme - 1]} alt="star" styleName="star active" />
            <img src={starArr[theme - 1]} alt="star" styleName="star active" />
            <img src={Star} alt="star" styleName="star" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Letter;
