import React from 'react';
import '../styles/record.less';
import Logo from 'Component/Logo';

class Index extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div styleName="record-page">
        <Logo />
        <div styleName="main">
          <img
            src="https://h5.lizhi.fm/static/voicereport/common/3.png"
            alt="avatar"
            styleName="avatar"
          />
          <div styleName="subject-text">
            <div styleName="tit" />
            你是乞力马扎罗山顶的雪，我是山脚下不 知名农户家里炉灶上的一团火。你在我心
            里亘古不变，而我的爱生生不息。想你的 时候，我就努力发热。
            <div styleName="from">——来自喜茶用户@栖檀w的情书</div>
          </div>
          <div styleName="time">TIME</div>
          <div styleName="process-bar">
            <div styleName="inset" />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
