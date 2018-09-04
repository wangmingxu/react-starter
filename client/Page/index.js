import React from 'react';
// import api from 'utils/api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/index.less';
import { NoticeBar, Flex, ActivityIndicator } from 'antd-mobile';
import Community from 'Component/Community';
import InfiniteScroll from 'react-infinite-scroller';
import { showDownloadDialog } from 'Component/DownloadDialog';
import { withUserAgent } from 'rc-useragent';
import Banner from 'Component/Banner';
import classNames from 'classnames';
import * as mineActions from 'Action/Mine';
import { WithLoginBtn } from 'Hoc/WithLogin';

const TabsMap = {
  SCHOOL_RANK: 1,
  PERSONAL_RANK: 2,
};

@connect(
  state => ({ mine: state.Mine, isLogin: state.Global.isLogin }),
  dispatch => bindActionCreators(mineActions, dispatch),
)
@withUserAgent
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: TabsMap.SCHOOL_RANK,
    };
  }
  componentDidMount() {
    this.props.loadMineInfo();
  }
  loadMore = (page) => {
    console.log(page);
  };
  gotoRecord = () => {
    if (this.props.ua.isLizhiFM) {
      this.props.history.push('/record');
    } else {
      showDownloadDialog({ action: 7, url: location.href });
    }
  }
  fixIpt = ({ target }) => {
    setTimeout(() => {
      target.scrollIntoView();
    }, 500);
  }
  changeTab = (tab) => {
    this.setState({ tab });
  }
  render() {
    const { tab } = this.state;
    return (
      <div styleName="index-page">
        <div styleName="scroller">
          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            loadMore={this.loadMore}
            hasMore
            useWindow={false}
            loader={
              <Flex justify="center" key={0}>
                <ActivityIndicator />
              </Flex>
            }
          >
            <Banner logo detail />
            <div styleName="notice-bar">
              <NoticeBar
                icon={<div styleName="laba" />}
                marqueeProps={{ loop: true, style: { color: '#80f2fa' } }}
                styleName="cl-notice"
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
                  <WithLoginBtn render={() =>
                    <div styleName="btn-login">登录</div>}
                  />
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
                <div><Community style={{ backgroundColor: '#3c04bd' }} /></div>
              </div>
            </div>
            <div styleName="tabs">
              <div
                styleName={classNames('item', {
                  active: tab === TabsMap.SCHOOL_RANK,
                })}
                onClick={() => {
                  this.changeTab(TabsMap.SCHOOL_RANK);
                }}
              >高校热度榜</div>
              <div
                styleName={classNames('item', {
                  active: tab === TabsMap.PERSONAL_RANK,
                })}
                onClick={() => {
                  this.changeTab(TabsMap.PERSONAL_RANK);
                }}
              >个人新声榜</div>
            </div>
            <input styleName="search-box" placeholder="搜索你喜爱的声音，为它打call吧" onFocus={this.fixIpt} />
            <div styleName="list">
              {
                new Array(10).fill({}).map((el, i) => <Community key={i} />)
              }
            </div>
          </InfiniteScroll>
        </div>
        {tab === TabsMap.PERSONAL_RANK ? <div styleName="btn-join" onClick={this.gotoRecord}>参与上传</div> : null}
      </div>
    );
  }
}

export default Index;
