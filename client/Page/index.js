import React from 'react';
import api from 'utils/api';
import { connect } from 'react-redux';
import * as demoAction from 'Action/Demo';
import '../styles/index.less';
import PropTypes from 'prop-types';
import { NoticeBar } from 'antd-mobile';
import laba from 'assets/campus-line/laba.png';
import Community from 'Component/Community';
import Logo from 'Component/Logo';
import InfiniteScroll from 'react-infinite-scroller';

@connect(
  state => ({ position: state.demo.position }),
  dispatch => ({ dispatch }),
)
class Index extends React.Component {
  static loadData = async (dispatch) => {
    const { data: position } = await api.getCity({ test: 1 });
    dispatch(demoAction.setPosition(position));
  };
  static propTypes = {
    position: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.constructor.loadData(this.props.dispatch);
  }
  render() {
    return (
      <div styleName="index-page">
        <Logo />
        <div styleName="activity-detail">活动详情</div>
        <div styleName="banner" />
        <div styleName="notice-row">
          <NoticeBar
            icon={<img src={laba} alt="laba" styleName="laba" />}
            marqueeProps={{ loop: true, style: { color: '#80f2fa' } }}
            styleName="notice-bar"
          >
            为你社团打CALL，寻找最美新声
          </NoticeBar>
          <div styleName="rest-votes">剩余贡献值：10</div>
        </div>
        <div styleName="user-card">
          <div styleName="user-info">
            <img
              src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0"
              alt="avatar"
              styleName="avatar"
            />
            <div styleName="stat">
              <div styleName="btn-login">登录</div>
              <div styleName="btn-my_voice">我的新声</div>
              <div styleName="rest-votes">剩余贡献值：10</div>
              <div styleName="history-votes">
                <div styleName="today">今日贡献：53244</div>
                <div styleName="total">总贡献值：53244</div>
              </div>
            </div>
          </div>
          <div styleName="my-community">
            <div styleName="title">我支持的社团</div>
            <Community style={{ backgroundColor: '#3c04bd' }} />
          </div>
        </div>
        <div styleName="tabs">
          <div styleName="item active">高校热度榜</div>
          <div styleName="item">个人新声榜</div>
        </div>
        <div styleName="user-card">
          <div styleName="user-info">
            <img
              src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0"
              alt="avatar"
              styleName="avatar"
            />
            <div styleName="stat">
              <div styleName="btn-login">登录</div>
              <div styleName="btn-my_voice">我的新声</div>
              <div styleName="rest-votes">剩余贡献值：10</div>
              <div styleName="history-votes">
                <div styleName="today">今日贡献：53244</div>
                <div styleName="total">总贡献值：53244</div>
              </div>
            </div>
          </div>
          <div styleName="my-community">
            <div styleName="title">我支持的社团</div>
            <Community style={{ backgroundColor: '#3c04bd' }} />
          </div>
        </div>
        <div styleName="user-card">
          <div styleName="user-info">
            <img
              src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0"
              alt="avatar"
              styleName="avatar"
            />
            <div styleName="stat">
              <div styleName="btn-login">登录</div>
              <div styleName="btn-my_voice">我的新声</div>
              <div styleName="rest-votes">剩余贡献值：10</div>
              <div styleName="history-votes">
                <div styleName="today">今日贡献：53244</div>
                <div styleName="total">总贡献值：53244</div>
              </div>
            </div>
          </div>
          <div styleName="my-community">
            <div styleName="title">我支持的社团</div>
            <Community style={{ backgroundColor: '#3c04bd' }} />
          </div>
        </div>
        <div styleName="user-card">
          <div styleName="user-info">
            <img
              src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0"
              alt="avatar"
              styleName="avatar"
            />
            <div styleName="stat">
              <div styleName="btn-login">登录</div>
              <div styleName="btn-my_voice">我的新声</div>
              <div styleName="rest-votes">剩余贡献值：10</div>
              <div styleName="history-votes">
                <div styleName="today">今日贡献：53244</div>
                <div styleName="total">总贡献值：53244</div>
              </div>
            </div>
          </div>
          <div styleName="my-community">
            <div styleName="title">我支持的社团</div>
            <Community style={{ backgroundColor: '#3c04bd' }} />
          </div>
        </div>
        <div styleName="user-card">
          <div styleName="user-info">
            <img
              src="http://wx.qlogo.cn/mmopen/fnOljJRc0roloB27t9a8Q1LaUNMxeYocs9lYDRaeG5JCeDvBVMVCLu6qZP76ibyuvB3TLGicqJpye8ZicTicr2YXKXficXXt3ejka/0"
              alt="avatar"
              styleName="avatar"
            />
            <div styleName="stat">
              <div styleName="btn-login">登录</div>
              <div styleName="btn-my_voice">我的新声</div>
              <div styleName="rest-votes">剩余贡献值：10</div>
              <div styleName="history-votes">
                <div styleName="today">今日贡献：53244</div>
                <div styleName="total">总贡献值：53244</div>
              </div>
            </div>
          </div>
          <div styleName="my-community">
            <div styleName="title">我支持的社团</div>
            <Community style={{ backgroundColor: '#3c04bd' }} />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
