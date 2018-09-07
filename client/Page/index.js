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
    this.searchRef = React.createRef();
  }
  async componentDidMount() {
    this.props.loadMineInfo();
    this.props.loadPersonalRank({ page: 1 });
    this.props.loadSchoolRank({ page: 1 });
  }
  get searchStr() {
    return this.searchRef.current.value;
  }
  get isSchoolRank() {
    return this.state.tab === ProgramType.SCHOOL;
  }
  get isVoiceRank() {
    return this.state.tab === ProgramType.PERSONAL;
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
    if (this.searchRef.current.value) {
      if (this.isVoiceRank) {
        this.props.loadPersonalRank({ page: 1 });
      } else {
        this.props.loadSchoolRank({ page: 1 });
      }
      this.searchRef.current.value = '';
    }
    this.setState({ tab });
  }
  search = debounce((nickName) => {
    if (this.isVoiceRank) {
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
    if (this.isVoiceRank) {
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
    const { list, hasMore } = this.isVoiceRank ? personalRank : schoolRank;
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
                    <div styleName="today">今日贡献：{isLogin ? mine.todayVotes : 0}</div>
                    <div styleName="total">总贡献值：{isLogin ? mine.hasUseVotes : 0}</div>
                  </div>
                </div>
              </div>
              <div styleName="my-community">
                <div styleName="title">我支持的社团</div>
                <div>
                  {mine.school ? <Program style={{ backgroundColor: '#3c04bd' }} type={ProgramType.SCHOOL} data={mine.school} onVote={this.addProgramVotes} /> : <div styleName="empty">还没有贡献的社团</div>}
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
            <div styleName={classNames('list', {
              hasFooter: this.isVoiceRank,
            })}
            >
              {
                list.map((item, i) => (<Program
                  key={item.id}
                  type={tab}
                  data={item}
                  rank={i + 1}
                  onVote={this.addProgramVotes}
                  onClick={() => {
                    this.isVoiceRank && this.gotoVoicePage(item.id);
                  }}
                />))
              }
            </div>
          </InfiniteScroll>
        </div>
        {this.isVoiceRank ? <div styleName="btn-join" onClick={this.gotoRecord}>参与上传</div> : null}
      </div>
    );
  }
}

export default Index;
