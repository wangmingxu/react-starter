import React, { Component } from 'react';
import '../styles/kllinfo.less';
import { Checkbox, Carousel, Picker, List, Toast } from 'antd-mobile';
import pic from '../assets/toyota/title-index.png';
import classNames from 'classnames';
import api from 'utils/api';
import videoUrl from '../assets/toyota/toyota.mp4';
import { Link } from 'react-router-dom';
import signature, { RndNum } from 'utils/signature';
import { showXieyi } from 'Component/Xieyi';
import qs from 'qs'

function PickerExtra(props) {
  // console.log(props);
  return <div onClick={props.onClick}>{props.extra}</div>;
}

const myWayTabs = ['预约试驾', '精彩视频', '精美车图'];
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTab: 0,
      imgList: ['saicheng', 'title-index'],
      name: '',
      tel: '',
      provinces: [],
      province: [],
      regionCitys: [],
      regionCity: [],
      dealer: [],
    };
    this.videoRef = React.createRef();
    this.controlBtnRef = React.createRef();
  }

  componentDidMount() {
    this.getProvince();
    console.log(videoUrl);
  }

  componentWillUnmount() {
    this.closeXieyi && this.closeXieyi.close();
  }

  componentDidUpdate() {
    if (this.videoRef.current) {
      this.videoRef.current.addEventListener(
        'pause',
        () => {
          this.controlBtnRef.current.hidden = false;
        },
        false,
      );
      this.videoRef.current.addEventListener(
        'ended',
        () => {
          this.controlBtnRef.current.hidden = false;
        },
        false,
      );
    }
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onTelChange = (e) => {
    this.setState({
      tel: e.target.value,
    });
  };

  getProvince = async () => {
    const res = await api.getProvince();
    this.setState({ provinces: res.slice(1).map(item => ({ label: item.name, value: item.cid })) });
  };

  getRegionCity = async () => {
    const res = await api.getRegionCity();
    this.setState({
      regionCitys: res.slice(1).map(item => ({ label: item.name, value: item.cid })),
    });
  };

  getDealer = async () => {
    const { data } = await api.getDealer();
    this.setState({ dealers: data.map(item => ({ label: item.name, value: item.id })) });
  };

  handleProvinceChange = (e) => {
    this.setState({ province: e, regionCity: null, dealer: null }, () => {
      this.getRegionCity();
    });
  };

  getRegionCity = async () => {
    const fd = new FormData();
    fd.append('cid', this.state.province)
    const res = await api.getRegionCity(fd);
    this.setState({
      regionCitys: res.slice(1).map(item => ({ label: item.name, value: item.cid })),
    });
  };

  handleRegionCityChange = (e) => {
    this.setState({ regionCity: e, dealer: null }, () => {
      this.getDealer();
    });
  };

  getDealer = async () => {
    const fd = new FormData();
    const { provinces, regionCitys, province, regionCity } = this.state;
    const cityName = provinces.find(item => province.includes(item.value)).label;
    const provinceName = regionCitys.find(item => regionCity.includes(item.value)).label;
    fd.append('cityName', cityName);
    fd.append('provinceName', provinceName);
    const { data } = await api.getDealer(fd);
    this.setState({ dealers: data.map(item => ({ label: item.name, value: item.code })) });
  }

  changeTab(type) {
    this.setState({
      curTab: type,
    });
  }

  playVideo = () => {
    this.videoRef.current.play();
    this.controlBtnRef.current.hidden = true;
  };

  handleDealerChange = (e) => {
    this.setState({ dealer: e }, () => {
      this.getRegionCity();
    });
  };

  onSubmit = async () => {
    console.log(this.state);
    const { name, tel, province, regionCity, dealer } = this.state;
    const mediaId = '97D9740ECE6FBD73F2F84DD16B6DBBB7';
    const Token = 'E983A6CCE83A6E325BB23857DBCAA040';
    // const mediaId = '161C09E54CA90DC1B6AAE7A90105CB3B';
    // const Token = 'D195B8BB0EBE6441E70F4A1A02E8F129';
    const randomNumber = "1" + RndNum(4);
    const timestamp = "2" + RndNum(10);
    const signatureVal = signature(Token, randomNumber, timestamp);
    const fd = qs.stringify({
      authentication: { "mediaId": mediaId, "timestamp": timestamp, "randomNumber": randomNumber, "signature": signatureVal },
      datas: [{
        mediaLeadId: RndNum(4),
        mediaLeadType: '预约试驾',
        // channelKeyId: 269,
        // channelId: 269,
        activity: 606,
        name: name,
        phone: tel,
        provinceId: province[0],
        cityId: regionCity[0],
        dealerId: dealer[0],
        seriesId: 37,
      }]
    })
    try {

    } catch (error) {

    }
    const res = await api.postLead(fd, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformResponse: [
        function (data) {
          const res = JSON.parse(data);
          return {
            state: res.status,
            message: res.message,
            data: res.data
          }
        }
      ]
    })
    console.log(res);
    if (res.state === 1) {
      Toast.info('提交成功')
    } else {
      Toast.info(res.message)
    }
  }
  showXieyi = () => {
    this.closeXieyi = showXieyi();
  }

  render() {
    const {
      province, regionCity, provinces, regionCitys, dealer, dealers,
    } = this.state;
    const formWrap = (
      <div styleName="main-inner formWrap">
        <div styleName="row">
          <span styleName="tag-name">您的姓名</span>
          <input styleName="fl" value={this.state.name} onChange={this.onNameChange} />
        </div>
        <div styleName="row">
          <span styleName="tag-name">
            联系方式
          </span>
          <input styleName="fl" value={this.state.tel} onChange={this.onTelChange} />
        </div>
        <div styleName="row">
          <span styleName="tag-name">所在地区</span>
          <div styleName="fl area">
            <div styleName="select">
              <div styleName="select-bd">
                <Picker
                  data={provinces}
                  cols={1}
                  value={province}
                  onChange={this.handleProvinceChange}
                >
                  <PickerExtra>请选择省份</PickerExtra>
                </Picker>
              </div>
              <div style={{ margin: '0 5px' }}>省</div>
            </div>
            <div styleName="select">
              <div styleName="select-bd">
                <Picker
                  data={regionCitys}
                  cols={1}
                  value={regionCity}
                  onChange={this.handleRegionCityChange}
                >
                  <PickerExtra>请选择市</PickerExtra>
                </Picker>
              </div>
              <div>市</div>
            </div>
          </div>
        </div>
        <div styleName="row">
          <span styleName="tag-name">经销商</span>
          <div styleName="fl select-bd">
            <Picker data={dealers} cols={1} value={dealer} onChange={this.handleDealerChange}>
              <PickerExtra>请选择经销商</PickerExtra>
            </Picker>
          </div>
        </div>
        <div styleName="reade-box">
          <Checkbox.AgreeItem className="info-checkbox" defaultChecked>
            <span styleName="name">
              我已阅读并同意
              <a onClick={this.showXieyi}>《保密声明》</a>
            </span>
          </Checkbox.AgreeItem>
        </div>
        <button styleName="btn-clear submit-btn" onClick={this.onSubmit}>确认提交</button>
      </div>
    );

    return (
      <div styleName="infor-wrap">
        <Link to="/" styleName="btn-back">返回首页</Link>
        <div styleName="wrap-inner">
          <div styleName="btn-box f--h">
            {myWayTabs.map((item, index) => (
              <button
                key={index}
                styleName={classNames('btn-clear', {
                  'cur-tab': this.state.curTab === index,
                })}
                onClick={() => {
                  this.changeTab(index);
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <div styleName="main-box">
            {this.state.curTab === 0 && formWrap}
            {this.state.curTab === 1 && (
              <div styleName="v-container" onClick={this.playVideo}>
                <video
                  ref={this.videoRef}
                  src={videoUrl}
                  preload="metadata"
                  x-webkit-airplay="true"
                  webkit-playsinline="true"
                  playsinline="true"
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="true"
                  x5-video-orientation="portraint"
                  controls
                />
                {/**<div ref={this.controlBtnRef} styleName="video-btn" />**/}
              </div>
            )}
            {this.state.curTab === 2 && (
              <div styleName="main-inner">
                <Carousel autoplay infinite>
                  {this.state.imgList.map(val => (
                    <img
                      key={val}
                      src={pic}
                      alt=""
                      styleName="pic"
                    />
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
