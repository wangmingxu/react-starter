import React, { Component } from 'react';
import '../styles/kllinfo.less';
import { Checkbox } from 'antd-mobile';

class Info extends Component {
  state = {};
  render() {
    return (
      <div styleName="infor-wrap">
        <div styleName="wrap-inner">
          <div styleName="btn-box f--h">
            <button styleName="btn-clear">预约试驾</button>
            <button styleName="btn-clear">精彩视频</button>
            <button styleName="btn-clear">精美车图</button>
          </div>
          <div styleName="main-box">
            <div styleName="main-inner">
              <div styleName="row">
                <span styleName="tag-name">您的姓名</span>
                <input styleName="fl" />
              </div>
              <div styleName="row">
                <span styleName="tag-name">联系方式</span>
                <input styleName="fl" />
              </div>
              <div styleName="row">
                <span styleName="tag-name">所在地区</span>
                <input styleName="fl" />
              </div>
              <div styleName="row">
                <span styleName="tag-name">经销商</span>
                <input styleName="fl" />
              </div>
              <div styleName="reade-box">
                <Checkbox.AgreeItem className="info-checkbox">
                  <span styleName="name">我已阅读并同意</span>
                  <a>《保密声明》</a>
                </Checkbox.AgreeItem>
              </div>
              <button styleName="btn-clear submit-btn">1确认提交</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Info;
