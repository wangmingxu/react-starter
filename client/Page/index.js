import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/index.less';
import { NoticeBar } from 'antd-mobile';
import Program from 'Component/Program';
import InfiniteScroll from 'react-infinite-scroller';
import { showDownloadDialog } from 'Component/DownloadDialog';
import { withUserAgent } from 'rc-useragent';
import Banner from 'Component/Banner';
import classNames from 'classnames';
import * as mineActions from 'Action/Mine';
import * as schoolRankActions from 'Action/SchoolRank';
import * as personalRankActions from 'Action/PersonalRank';
import * as GlobalActions from 'Action/Global';
import { WithLoginBtn } from 'Hoc/WithLogin';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { ProgramType, noticeText } from 'constant';
import api from 'utils/api';

@connect(
  state => ({
    mine: state.Mine,
    isLogin: state.Global.isLogin,
    schoolRank: state.SchoolRank,
    personalRank: state.PersonalRank,
    tab: state.Global.tab,
  }),
  dispatch => bindActionCreators(
    {
      ...mineActions, ...personalRankActions, ...schoolRankActions, ...GlobalActions,
    },
    dispatch,
  ),
)
@withUserAgent
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }
  async componentDidMount() {
    this.props.loadPersonalRank({ page: 1 });
    this.props.loadSchoolRank({ page: 1 });
  }
  get searchStr() {
    return this.searchRef.current && this.searchRef.current.value;
  }
  get isSchoolRank() {
    return this.props.tab === ProgramType.SCHOOL;
  }
  get isVoiceRank() {
    return this.props.tab === ProgramType.PERSONAL;
  }
  loadMore = () => {
    // console.log(page);
    const { personalRank, schoolRank } = this.props;
    if (this.isVoiceRank) {
      this.props.loadPersonalRank({ page: personalRank.pageIndex + 1, nickName: this.searchStr });
    } else {
      this.props.loadSchoolRank({ page: schoolRank.pageIndex + 1, name: this.searchStr });
    }
  };
  downloadApp = () => {
    showDownloadDialog({
      type: 7,
      url: location.href,
    });
  }
  fixIpt = ({ target }) => {
    setTimeout(() => {
      target.scrollIntoViewIfNeeded();
    }, 500);
  }
  changeTab = (tab) => {
    if (this.searchRef.current.value) {
      if (this.isVoiceRank) {
        this.props.loadPersonalRank({ page: 1 });
      } else {
        this.props.loadSchoolRank({ page: 1 });
      }
      this.searchRef.current.value = '';
    }
    this.props.toggleTab(tab);
  }
  search = debounce((nickName) => {
    if (this.isVoiceRank) {
      this.props.loadPersonalRank({ page: 1, nickName });
    } else {
      this.props.loadSchoolRank({ page: 1, name: nickName });
    }
  }, 500)
  addProgramVotes = (id, votes) => {
    // const { schoolRank, personalRank } = this.props;
    if (this.isVoiceRank) {
      // this.props.setPersonalRank({
      //   ...personalRank,
      //   list: personalRank.list.map(item =>
      //     (id === item.id ? { ...item, vote: item.vote + votes } : item)),
      // });
      this.props.updatePersonalRank();
      this.props.loadSchoolRank({ page: 1 });
    } else {
      // this.props.setSchoolRank({
      //   ...schoolRank,
      //   list: schoolRank.list.map(item =>
      //     (id === item.id ? { ...item, vote: item.vote + votes } : item)),
      // });
      this.props.updateSchoolRank();
    }
  }
  handleLoginFinish = async () => {
    this.props.loadMineInfo();
    const { deviceId } = await lz.getAppInfo();
    await api.getLoginVote({ deviceId }, { needAuth: true, timeout: 3000 });
  }
  render() {
    const {
      mine, ua, isLogin, schoolRank, personalRank, tab,
    } = this.props;
    const { list, hasMore } = this.isVoiceRank ? personalRank : schoolRank;
    return (
      <div styleName="index-page">
        <div styleName="scroller" id="scroller">
          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            loadMore={this.loadMore}
            hasMore={hasMore}
            useWindow
            loader={null}
            // loader={
            //   <Flex justify="center" key={0} style={{ marginBottom: '1.28rem' }}>
            //     <ActivityIndicator />
            //   </Flex>
            // }
          >
            <Banner logo detail />
            <div styleName="notice-bar">
              <NoticeBar
                icon={<div styleName="laba" />}
                marqueeProps={{ loop: true, style: { color: '#80f2fa' } }}
                styleName="cl-notice"
              >
                {noticeText}
              </NoticeBar>
            </div>
            {ua.isLizhiFM ? (<div styleName="user-card">
              <div styleName="user-info">
                <img
                  src={mine.image}
                  alt="avatar"
                  styleName="avatar"
                />
                <div styleName="stat">
                  {isLogin ?
                    <div styleName="nickName">{mine.nickName}</div> :
                    <WithLoginBtn onLogin={this.handleLoginFinish} render={() => <div styleName="btn-login">登录</div>} />
                  }
                  <WithLoginBtn onLogin={this.handleLoginFinish} render={() => <Link styleName="btn-my_voice" to="/mine">我的新声</Link>} />
                  <div styleName="rest-votes">剩余贡献值：{isLogin ? mine.myVotes : 0}</div>
                  <div styleName="history-votes">
                    <div styleName="today">今日贡献：{isLogin ? mine.todayVotes : 0}</div>
                    <div styleName="total">总贡献值：{isLogin ? mine.hasUseVotes : 0}</div>
                  </div>
                </div>
              </div>
              <div styleName="my-community">
                <div styleName="title">我支持的社团</div>
                <div>
                  {mine.school ? <Program
                    style={{ backgroundColor: '#3c04bd' }}
                    type={ProgramType.SCHOOL}
                    data={mine.school}
                    onVote={() => {
                      this.props.loadSchoolRank({ page: 1 });
                    }}
                  /> : <div styleName="empty">还没有贡献的社团</div>}
                </div>
              </div>
            </div>) : null}
            <div styleName="tabs">
              <div
                styleName={classNames('item', {
                  active: this.isSchoolRank,
                })}
                onClick={() => {
                  this.changeTab(ProgramType.SCHOOL);
                }}
              >高校热度榜</div>
              <div
                styleName={classNames('item', {
                  active: this.isVoiceRank,
                })}
                onClick={() => {
                  this.changeTab(ProgramType.PERSONAL);
                }}
              >个人新声榜</div>
            </div>
            <input
              styleName="search-box"
              placeholder={this.isVoiceRank ? '搜索你喜爱的声音，为它打call吧' : '搜索你的学校社团，为它打call吧'}
              onFocus={this.fixIpt}
              ref={this.searchRef}
              onChange={(e) => {
                this.search(e.target.value);
              }}
            />
            <div styleName="list">
              {list.length === 0 && this.searchStr ?
                <div styleName="empty">未搜索到对应的{this.isSchoolRank ? '社团' : '用户'}</div> :
                list.map(item => (<Program
                  key={item.id}
                  type={tab}
                  data={item}
                  onVote={this.addProgramVotes}
                />))}
            </div>
          </InfiniteScroll>
        </div>
        {ua.isLizhiFM ?
          <WithLoginBtn onLogin={this.handleLoginFinish} render={() => <Link styleName="btn-join" to="/record">参与上传</Link>} /> :
          <div styleName="btn-join" onClick={this.downloadApp}>参与上传</div>
        }
      </div>
    );
  }
}

export default Index;
