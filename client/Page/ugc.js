import React from 'react';
import '../styles/audio.less';
import Logo from 'Component/Logo';
import DetailDialog from 'Component/DetailDialog';
import Letter from 'Component/Letter';
import api from 'utils/api';
import { Toast } from 'antd-mobile';
import classNames from 'classnames';
import OnePage from 'Hoc/onePage';
import get from 'lodash/get';

class Ugc extends React.Component {
  state = {
    showDetailDialog: false,
    audioInfo: null,
  }
  componentDidMount() {
    this.loadData();
  }
  get audioId() {
    const { id } = this.props.match.params;
    return id;
  }
  get isOwn() {
    const { search } = this.props.location;
    const qs = new URLSearchParams(search);
    const isOwn = qs.get('isOwn');
    return Boolean(isOwn);
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
    const method = window.platform === 'IPhone' && window.isWX ? 'replace' : 'push';
    history[method](`/poster/${this.audioId}`);
  }
  knowMore = () => {
    this.setState({ showDetailDialog: true });
  }
  navToIndex = () => {
    const { history } = this.props;
    const method = window.platform === 'IPhone' && window.isWX ? 'replace' : 'push';
    history[method]('/');
  }
  render() {
    const { showDetailDialog, audioInfo } = this.state;
    const theme = get(audioInfo, 'theme');
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
        <div styleName={classNames('audio-page', { [`theme${theme}`]: theme })}>
          <OnePage render={({ scale }) => (
            <div className="onePage" style={{ transform: `scale(${scale})` }}>
              {audioInfo ? (<Letter audioInfo={audioInfo} displayType="dom" usefor="ugc" />) : null}
              {this.isOwn ? (<div styleName="btn-poster" onClick={this.makePoster} />) :
                (<div styleName="btn-join" onClick={this.navToIndex} />)}
              <div styleName="btn-knowMore" onClick={this.knowMore} />
            </div>
          )}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Ugc;
