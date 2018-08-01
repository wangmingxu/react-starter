import React from 'react';
import '../styles/audio.less';
import Logo from 'assets/logo.png';
import Letter from 'Component/Letter';
import { Toast } from 'antd-mobile';
import api from 'utils/api';

class Poster extends React.Component {
  state = {
    audioInfo: {},
  }
  async componentDidMount() {
    await this.loadData();
    Toast.loading('正在生成海报...');
  }
  get audioId() {
    const { id } = this.props.match.params;
    return id;
  }
  loadData = async () => {
    try {
      const { data } = await api.loadAudioInfo({ id: this.audioId });
      this.setState({ audioInfo: data });
    } catch (error) {
      Toast.fail(error);
      return Promise.reject(error);
    }
  }
  render() {
    const { audioInfo } = this.state;
    return (
      <React.Fragment>
        <div styleName="audio-page">
          <Letter audioInfo={audioInfo} />
          <img src={Logo} styleName="logo" alt="logo" />
          <div styleName="scan-tip">扫码聆听<br />我的声音情书有多撩</div>
        </div>
        <div styleName="tip-save" />
      </React.Fragment>
    );
  }
}

export default Poster;
