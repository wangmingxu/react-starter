import React from 'react';
import '../styles/audio.less';
import Logo from 'assets/logo.png';
import Letter from 'Component/Letter';
import { Toast } from 'antd-mobile';
import api from 'utils/api';
import html2canvas from 'html2canvas';
import classNames from 'classnames';
import OnePage from 'Hoc/onePage';
import get from 'lodash/get';
import throttle from 'lodash/throttle';

class Poster extends React.Component {
  state = {
    audioInfo: null,
    imgData: '',
  }
  async componentDidMount() {
    await this.loadData();
    const imgData = await this.GeneratePoster();
    this.setState({ imgData });
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
  GeneratePoster = async () => {
    try {
      Toast.loading('正在生成海报...');
      const canvas = await html2canvas(document.getElementById('poster'), {
        useCORS: true,
        scale: window.platform === 'Android' ? window.devicePixelRatio : 1,
      });
      // const imgData = canvas.toDataURL(`image/${window.platform === 'Android' && window.isApp ? 'png' : 'jpeg'}`);
      const imgData = canvas.toDataURL('image/jpeg');
      // document.body.replaceChild(canvas, document.getElementById('app'));
      // window.alert(imgData.slice(0, 30));
      if (imgData.slice(0, 15).length < 15) {
        await Promise.reject(new Error('生成图片失败'));
      }
      return imgData;
    } catch (error) {
      Toast.fail(error);
      return Promise.reject(error);
    }
  }
  save = throttle(() => {
    const { imgData } = this.state;
    lz.saveImage({
      image: imgData,
    }).then((ret) => {
      // lz.alt(rst);
      if (ret.status === 'success') {
        console.log('保存成功');
      }
    });
    _hmt.push(['_trackEvent', '页面', '点击', '保存图片']);
  }, 1500)
  render() {
    const { audioInfo, imgData } = this.state;
    const theme = get(audioInfo, 'theme');
    return (
      <React.Fragment>
        {imgData.length > 0 ?
          ([<img src={imgData} alt="poster" styleName="picture" key="poster" />,
            <div styleName="btn-save" onClick={this.save} key="save" />,
          ]) :
          (<div styleName={classNames('audio-page', { [`theme${theme}`]: theme })} id="poster">
            <OnePage render={({ scale }) => (
              <div className="onePage" style={{ transform: `scale(${scale})` }}>
                {audioInfo ? (<Letter audioInfo={audioInfo} displayType="pic" usefor="poster" />) : null}
                <img src={Logo} styleName="logo" alt="logo" />
                <div styleName="scan-tip">扫码聆听<br />我的声音情书有多撩</div>
                <img styleName="qrcode" src={`/loveletter/loadQrCode?id=${this.audioId}`} alt="qrcode" />
              </div>
            )}
            />
          </div>)}
        <div styleName="tip-save" />
      </React.Fragment>
    );
  }
}

export default Poster;
