import React from 'react';
import '../styles/audio.less';
import Logo from 'assets/logo.png';
import Letter from 'Component/Letter';

class Poster extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <div styleName="audio-page">
          <Letter theme={1} />
          <img src={Logo} styleName="logo" alt="logo" />
          <div styleName="scan-tip">扫码聆听<br />我的声音情书有多撩</div>
        </div>
        <div styleName="tip-save" />
      </React.Fragment>
    );
  }
}

export default Poster;
