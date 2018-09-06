import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/index.less';
import { NoticeBar, Flex, ActivityIndicator } from 'antd-mobile';
import Program from 'Component/Program';
import InfiniteScroll from 'react-infinite-scroller';
import { showDownloadDialog } from 'Component/DownloadDialog';
import { withUserAgent } from 'rc-useragent';
import Banner from 'Component/Banner';
import classNames from 'classnames';
import * as mineActions from 'Action/Mine';
import * as schoolRankActins from 'Action/SchoolRank';
import * as personalRankActins from 'Action/PersonalRank';
import { WithLoginBtn } from 'Hoc/WithLogin';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { ProgramType, noticeText } from 'constant';

@connect(
  state => ({
    mine: state.Mine,
    isLogin: state.Global.isLogin,
    schoolRank: state.SchoolRank,
    personalRank: state.PersonalRank,
  }),
  dispatch => bindActionCreators(
    { ...mineActions, ...personalRankActins, ...schoolRankActins },
    dispatch,
  ),
)
@withUserAgent
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: ProgramType.SCHOOL,
    };
  }
  async componentDidMount() {
    this.props.loadMineInfo();
    this.changeTab(ProgramType.SCHOOL);
  }
  loadMore = (page) => {
    const params = { page };
    if (this.state.tab === ProgramType.PERSONAL) {
      this.props.loadPersonalRank(params);
    } else {
      this.props.loadSchoolRank(params);
    }
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
      target.scrollIntoViewIfNeeded();
    }, 500);
  }
  changeTab = (tab) => {
    this.setState({ tab });
    // todo
    if (tab === ProgramType.PERSONAL) {
      this.props.loadPersonalRank({ page: 1 });
    } else {
      this.props.loadSchoolRank({ page: 1 });
    }
  }
  search = debounce((nickName) => {
    if (this.state.tab === ProgramType.PERSONAL) {
      this.props.loadPersonalRank({ page: 1, nickName });
    } else {
      this.props.loadSchoolRank({ page: 1, name: nickName });
    }
  }, 500)
  gotoVoicePage = (id) => {
    this.props.history.push(`/voice/${id}`);
  }
  addProgramVotes = (id, votes) => {
    const { schoolRank, personalRank } = this.props;
    if (this.state.tab === ProgramType.PERSONAL) {
      this.props.setPersonalRank({
        ...personalRank,
        list: personalRank.list.map(item =>
          (id === item.id ? { ...item, vote: item.vote + votes } : item)),
      });
    } else {
      this.props.setSchoolRank({
        ...schoolRank,
        list: schoolRank.list.map(item =>
          (id === item.id ? { ...item, vote: item.vote + votes } : item)),
      });
    }
  }
  render() {
    const { tab } = this.state;
    const {
      mine, ua, isLogin, schoolRank, personalRank,
    } = this.props;
    const { list, hasMore } = tab === ProgramType.PERSONAL ? personalRank : schoolRank;
    return (
      <div styleName="index-page">
        <div styleName="scroller">
          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            loadMore={this.loadMore}
            hasMore={hasMore}
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
                  {isLogin ? <div styleName="nickName">{mine.nickName}</div> : <WithLoginBtn render={() => <div styleName="btn-login">登录</div>} />
                  }
                  <Link styleName="btn-my_voice" to="/mine">我的新声</Link>
                  <div styleName="rest-votes">剩余贡献值：{isLogin ? mine.myVotes : 0}</div>
                  <div styleName="history-votes">
                    <div styleName="today">今日贡献：{isLogin ? mine.hasUseVotes : 0}</div>
                    <div styleName="total">总贡献值：{isLogin ? mine.todayVotes : 0}</div>
                  </div>
                </div>
              </div>
              <div styleName="my-community">
                <div styleName="title">我支持的社团</div>
                <div>
                  {mine.school ? <Program style={{ backgroundColor: '#3c04bd' }} type={ProgramType.SCHOOL} data={mine.school} rank={1} onVote={this.addProgramVotes} /> : <div styleName="empty">还没有贡献的社团</div>}
                </div>
              </div>
            </div>) : null}
            <div styleName="tabs">
              <div
                styleName={classNames('item', {
                  active: tab === ProgramType.SCHOOL,
                })}
                onClick={() => {
                  this.changeTab(ProgramType.SCHOOL);
                }}
              >高校热度榜</div>
              <div
                styleName={classNames('item', {
                  active: tab === ProgramType.PERSONAL,
                })}
                onClick={() => {
                  this.changeTab(ProgramType.PERSONAL);
                }}
              >个人新声榜</div>
            </div>
            <input
              styleName="search-box"
              placeholder="搜索你喜爱的声音，为它打call吧"
              onFocus={this.fixIpt}
              onChange={(e) => {
                this.search(e.target.value);
              }}
            />
            <div styleName={classNames('list', {
              hasFooter: tab === ProgramType.PERSONAL,
            })}
            >
              {
                list.map((item, i) => (<Program
                  key={item.id}
                  type={tab}
                  data={item}
                  rank={i + 1}
                  onClick={() => {
                    tab === ProgramType.PERSONAL && this.gotoVoicePage(item.id);
                  }}
                />))
              }
            </div>
          </InfiniteScroll>
        </div>
        {tab === ProgramType.PERSONAL ? <div styleName="btn-join" onClick={this.gotoRecord}>参与上传</div> : null}
      </div>
    );
  }
}

export default Index;
