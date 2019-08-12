import React, { Component } from 'react';
import '../styles/kllinfo.less';
import { Checkbox, Carousel, Picker, List } from 'antd-mobile';
import pic from '../assets/toyota/title-index.png';
import classNames from 'classnames';

const distributorList = [
  {
    label: 'aaa',
    value: 'aaa',
  },
  {
    label: 'bbb',
    value: 'bbb',
  },
];
const myWayTabs = ['预约试驾', '精彩视频', '精美车图'];
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTab: 0,
      imgList: ['saicheng', 'title-index'],
      name: '',
      tel: '',
      address: '',
      distributor: [],
    };
    this.videoRef = React.createRef();
    this.controlBtnRef = React.createRef();
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

  playVideo = () => {
    this.videoRef.current.play();
    console.log(this.videoRef);
    console.log(this.controlBtnRef);
    this.controlBtnRef.current.hidden = true;
  };

  changeTab(type) {
    this.setState({
      curTab: type,
    });
  }

  render() {
    const formWrap = (
      <div styleName="main-inner formWrap">
        <div styleName="row">
          <span styleName="tag-name">您的姓名</span>
          <input styleName="fl" value={this.state.name} onChange={this.onNameChange} />
        </div>
        <div styleName="row">
          <span styleName="tag-name" value={this.state.tel} onChange={this.onTelChange}>
            联系方式
          </span>
          <input styleName="fl" />
        </div>
        <div styleName="row">
          <span styleName="tag-name">所在地区</span>
          <div styleName="fl area">
            <div styleName="select">
              <div styleName="select-bd">
                <Picker data={distributorList} cols={2} value={this.state.distributor}>
                  <div>请选择省份</div>
                </Picker>
              </div>
              <div style={{ margin: '0 5px' }}>省</div>
            </div>
            <div styleName="select">
              <div styleName="select-bd">
                <Picker data={distributorList} cols={2} value={this.state.distributor}>
                  <div>请选择市</div>
                </Picker>
              </div>
              <div>市</div>
            </div>
          </div>
        </div>
        <div styleName="row">
          <span styleName="tag-name">经销商</span>
          <div styleName="fl select-bd">
            <Picker data={distributorList} cols={1} value={this.state.distributor}>
              <div>请选择经销商</div>
            </Picker>
          </div>
        </div>
        <div styleName="reade-box">
          <Checkbox.AgreeItem className="info-checkbox">
            <span styleName="name">
              我已阅读并同意
              <a>《保密声明》</a>
            </span>
          </Checkbox.AgreeItem>
        </div>
        <button styleName="btn-clear submit-btn">确认提交</button>
      </div>
    );

    return (
      <div styleName="infor-wrap">
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
                  src="https://bizadv.lizhi.fm/static/2018/hytVideo/10.mp4"
                  poster="https://bizadv.lizhi.fm/static/2018/hytVideo/poster10.png"
                  preload="metadata"
                />
                <div ref={this.controlBtnRef} styleName="video-btn" />
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
                      style={{ width: '100%', height: '495px', verticalAlign: 'top' }}
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
