import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Flex, ActivityIndicator } from 'antd-mobile';
import classNames from 'classnames';
import * as mineActions from 'Action/Mine';
import * as talkRankActions from 'Action/TalkRank';
import * as coverRankActions from 'Action/CoverRank';
import * as GlobalActions from 'Action/Global';
import Program from '@/Component/Program';
import { ProgramType } from '@/constant';
import api from 'utils/api';
import '../styles/rank.less';

@connect(
  state => ({
    mine: state.Mine,
    talkRank: state.TalkRank,
    coverRank: state.CoverRank,
    tab: state.Global.tab,
    activityStatus: state.Global.activityStatus,
  }),
  dispatch =>
    bindActionCreators(
      {
        ...mineActions,
        ...coverRankActions,
        ...talkRankActions,
        ...GlobalActions,
      },
      dispatch,
    ),
)
class Rank extends Component {
  get dataSource() {
    const { tab, coverRank, talkRank } = this.props;
    const { myAudio } = this.state;
    return [coverRank, talkRank, { list: myAudio }][tab];
  }
  get hasMore() {
    const { tab, coverRank, talkRank } = this.props;
    return [coverRank.hasMore, talkRank.hasMore, false][tab];
  }
  get ticket() {
    const { tab, mine } = this.props;
    return [mine.coverTicket, mine.talkTicket, 0][tab];
  }
  state = {
    tabs: [{ name: '最热翻唱', id: 0 }, { name: '最热说说', id: 1 }, { name: '我的音频', id: 2 }],
    myAudio: [],
  };
  async componentDidMount() {
    this.loadData();
  }
  loadData = (params = {}) => {
    const { tab } = this.props;
    switch (tab) {
    case 0:
      this.props.loadCoverRank({ pageIndex: 1, activityId: ProgramType.COVER, ...params });
      break;
    case 1:
      this.props.loadTalkRank({ pageIndex: 1, activityId: ProgramType.TALK, ...params });
      break;
    case 2:
      this.loadMineAudio();
      break;
    default:
      break;
    }
  };
  updateData = () => {
    const { tab } = this.props;
    switch (tab) {
    case 0:
      this.props.updateCoverRank();
      break;
    case 1:
      this.props.updateTalkRank();
      break;
    case 2:
      this.loadMineAudio();
      break;
    default:
      break;
    }
  };
  changeTab = (id) => {
    this.props.toggleTab(id);
    setTimeout(this.loadData);
  };
  loadMore = () => {
    // console.log(page);
    // TODO: 判断活动id
    this.loadData({ pageIndex: this.dataSource.pageIndex + 1 });
  };
  loadMineAudio = async () => {
    let myAudio = await Promise.all(Object.values(ProgramType).map(activityId =>
      api
        .listMyAudio({
          activityId,
          pageIndex: 1,
          pageSize: 50,
        })
        .then(res => res.data.content)));
    myAudio = [].concat(...myAudio);
    console.log(myAudio);
    this.setState({ myAudio });
  };
  render() {
    const { tabs } = this.state;
    const { tab, mine } = this.props;
    return (
      <div>
        <div styleName="tabs">
          {tabs.map(item => (
            <div
              styleName={classNames('item', {
                active: tab === item.id,
              })}
              key={item.id}
              onClick={this.changeTab.bind(null, item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div styleName="tit">
          <div styleName="rank-txt">排行榜</div>
          <div styleName="votes" style={{ opacity: tab === 2 ? 0 : 1 }}>
            可用票数：
            {this.ticket}
          </div>
        </div>
        <div styleName="rank-list">
          <InfiniteScroll
            pageStart={0}
            initialLoad={false}
            loadMore={this.loadMore}
            hasMore={this.hasMore}
            useWindow={false}
            loader={
              <Flex justify="center" key={0} style={{ marginBottom: '1.28rem' }}>
                <ActivityIndicator />
              </Flex>
            }
          >
            {this.dataSource.list.map(item => (
              <Program data={item} key={item.id} onVote={this.updateData} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default Rank;
