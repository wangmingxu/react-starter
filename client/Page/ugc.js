import React from 'react';
import '../styles/kol.less';
import Logo from 'Component/Logo';
import ActiveStar from 'assets/loveletter/star-active.png';
import Star from 'assets/loveletter/star.png';

class Ugc extends React.Component {
  componentDidMount() {}
  navToRecord = () => {
    const { history } = this.props;
    history.push('/record');
  }
  render() {
    return (
      <React.Fragment>
        <Logo />
        <div styleName="kol-page">
          <div styleName="book">
            <img
              src="https://h5.lizhi.fm/static/voicereport/common/3.png"
              styleName="avatar"
              alt="avatar"
            />
            <div styleName="btn-play" />
            <div styleName="card">
                来自诗歌岛用户@流马的情书<br />—荔枝主播@薄荷微凉-小糖 FM13593倾声演绎
            </div>
            <div styleName="voice-index">
              <div styleName="item">
                <div styleName="label">撩人指数：</div>
                <div styleName="val">
                  <img src={ActiveStar} alt="star" styleName="star active" />
                  <img src={ActiveStar} alt="star" styleName="star active" />
                  <img src={ActiveStar} alt="star" styleName="star active" />
                  <img src={ActiveStar} alt="star" styleName="star active" />
                  <img src={Star} alt="star" styleName="star" />
                </div>
              </div>
              <div styleName="item">
                <div styleName="label">催泪指数：</div>
                <div styleName="val">
                  <img src={ActiveStar} alt="star" styleName="star active" />
                  <img src={ActiveStar} alt="star" styleName="star active" />
                  <img src={ActiveStar} alt="star" styleName="star active" />
                  <img src={ActiveStar} alt="star" styleName="star active" />
                  <img src={Star} alt="star" styleName="star" />
                </div>
              </div>
            </div>
          </div>
          <div styleName="btn" onClick={this.navToRecord} />
        </div>
      </React.Fragment>
    );
  }
}

export default Ugc;
