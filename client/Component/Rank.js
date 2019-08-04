import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Flex, ActivityIndicator } from 'antd-mobile';
import classNames from 'classnames';
import * as mineActions from 'Action/Mine';
import * as schoolRankActions from 'Action/SchoolRank';
import * as personalRankActions from 'Action/PersonalRank';
import * as GlobalActions from 'Action/Global';
import Program from '@/Component/Program'
import '../styles/rank.less'

@connect(
    state => ({
        mine: state.Mine,
        schoolRank: state.SchoolRank,
        personalRank: state.PersonalRank,
        tab: state.Global.tab,
        activityStatus: state.Global.activityStatus,
    }),
    dispatch => bindActionCreators(
        {
            ...mineActions, ...personalRankActions, ...schoolRankActions, ...GlobalActions,
        },
        dispatch,
    ),
)
class Rank extends Component {
    state = {
        tabs: [
            { name: '最热翻唱', id: 0 },
            { name: '最热说说', id: 1 },
            { name: '我的音频', id: 2 },
        ],
    }
    async componentDidMount() {
        this.props.loadPersonalRank({ page: 1, activityId: 4 });
    }
    changeTab = (id) => {
        this.props.toggleTab(id);
        //TODO: 判断活动id
        this.props.loadPersonalRank({ pageIndex: 1, activityId: 4 })
    }
    loadMore = () => {
        // console.log(page);
        const { personalRank } = this.props;
        //TODO: 判断活动id
        this.props.loadPersonalRank({ pageIndex: personalRank.pageIndex + 1, activityId: 4 });
    };
    render() {
        const { tabs } = this.state;
        const { tab, personalRank } = this.props;
        const { hasMore, list } = personalRank
        return (
            <div>
                <div styleName="tabs">
                    {tabs.map(item => (
                        <div
                            styleName={classNames("item", {
                                active: tab === item.id
                            })}
                            key={item.id}
                            onClick={this.changeTab.bind(null, item.id)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
                <div styleName="tit">
                    <div styleName="rank-txt">
                        排行榜
                    </div>
                    <div styleName="votes">
                        可用票数：20
                    </div>
                </div>
                <div styleName="rank-list">
                    <InfiniteScroll
                        pageStart={0}
                        initialLoad={false}
                        loadMore={this.loadMore}
                        hasMore={hasMore}
                        useWindow={false}
                        loader={
                            <Flex justify="center" key={0} style={{ marginBottom: '1.28rem' }}>
                                <ActivityIndicator />
                            </Flex>
                        }
                    >
                        {list.map(item => (<Program data={item} key={item.id} />))}
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}

export default Rank;