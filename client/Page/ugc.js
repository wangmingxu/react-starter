import React from 'react';
import '../styles/audio.less';
import Logo from 'Component/Logo';
import DetailDialog from 'Component/DetailDialog';
import Letter from 'Component/Letter';
import api from 'utils/api';
import { Toast } from 'antd-mobile';

class Ugc extends React.Component {
  state = {
    showDetailDialog: false,
    audioInfo: {},
  }
  componentDidMount() {
    this.loadData();
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
  makePoster = () => {
    const { history } = this.props;
    history.push('/poster');
  }
  knowMore = () => {
    this.setState({ showDetailDialog: true });
  }
  render() {
    const { showDetailDialog, audioInfo } = this.state;
    return (
      <React.Fragment>
        <Logo />
        <DetailDialog
          status={showDetailDialog}
          type={2}
          onClose={() => {
            this.setState({ showDetailDialog: false });
          }}
        />
        <div styleName="audio-page">
          <Letter audioInfo={audioInfo} />
          <div styleName="btn-poster" onClick={this.makePoster} />
          <div styleName="btn-knowMore" onClick={this.knowMore} />
        </div>
      </React.Fragment>
    );
  }
}

export default Ugc;
