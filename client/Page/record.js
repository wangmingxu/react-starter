import React from 'react';
import '../styles/record.less';
import Logo from 'Component/Logo';

class Index extends React.Component {
  componentDidMount() {
  }
  render() {
    return (<div styleName="record-page">
      <Logo />
      <div styleName="main">
      <img src="https://h5.lizhi.fm/static/voicereport/common/3.png" alt="avatar" styleName="avatar" />
      <div styleName="subject-text">
      <div styleName="tit"/>
      </div>
      </div>
    </div>);
  }
}

export default Index;
