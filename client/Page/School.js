import React from 'react';
import Banner from 'Component/Banner';
import Program from 'Component/Program';
import { NoticeBar, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import api from 'utils/api';
import '../styles/school.less';
import debounce from 'lodash/debounce';
import { noticeText, ProgramType } from 'constant';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as mineActions from 'Action/Mine';
import { showDownloadDialog } from 'Component/DownloadDialog';
import { withUserAgent } from 'rc-useragent';
import { WithLoginBtn } from 'Hoc/WithLogin';

@connect(
  state => ({
    mine: state.Mine,
    isLogin: state.Global.isLogin,
    activityStatus: state.Global.activityStatus,
  }),
  dispatch => bindActionCreators(mineActions, dispatch),
)
@withUserAgent
class School extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioList: [],
      schoolInfo: {},
    };
    this.searchRef = React.createRef();
  }

  componentDidMount() {
    this.loadSchoolAudio();
  }

  get sId() {
    const { match: { params } } = this.props;
    return params.id;
  }

  get searchStr() {
    return this.searchRef.current && this.searchRef.current.value;
  }

  loadSchoolAudio = async (params) => {
    const { data: { list: { list }, school } } = await api.listSchoolAudio({
      sId: this.sId, page: 1, pageSize: 50, ...params,
    });
    this.setState({ audioList: list, schoolInfo: school });
  }

  search = debounce((nickName) => {
    this.loadSchoolAudio({ nickName });
  }, 500)

  fixIpt = ({ target }) => {
    setTimeout(() => {
      target.scrollIntoView();
    }, 500);
  }

  downloadApp = () => {
    showDownloadDialog({
      type: 7,
      url: location.href,
    });
  }

  gotoRecord = () => {
    if (this.props.activityStatus) {
      this.props.history.push('/record');
    } else {
      Toast.info('当前时间不在活动时间内', 1);
    }
  }

  render() {
    const { audioList, schoolInfo } = this.state;
    const { mine, ua, isLogin } = this.props;
    return (
      <div styleName="page-school">
        <Banner logo={false} detail>
          <Link to="/" styleName="btn-back">返回首页</Link>
          <div styleName="scholl-name">{schoolInfo.assnName}</div>
        </Banner>
        <div styleName="notice-bar">
          <NoticeBar
            icon={<div styleName="laba" />}
            marqueeProps={{ loop: true, style: { color: '#80f2fa' } }}
            styleName="cl-notice"
          >
            {noticeText}
          </NoticeBar>
          {ua.isLizhiFM && isLogin ? <div styleName="rest-votes">剩余贡献值：{mine.myVotes}</div> : null}
        </div>
        <input
          styleName="search-box"
          placeholder="搜索你喜爱的声音，为它打call吧"
          ref={this.searchRef}
          onFocus={this.fixIpt}
          onChange={(e) => {
            this.search(e.target.value);
          }}
        />
        <div styleName="card">
          {audioList.length > 0 ? audioList.map(item => (
            <Program
              key={item.id}
              styleName="item"
              data={item}
              type={ProgramType.PERSONAL}
              onVote={() => {
                this.loadSchoolAudio();
              }}
            />
          )) : <div styleName="empty">{this.searchStr ? '未搜索到对应的用户' : '还没有上传的新声'}</div>}
        </div>
        {ua.isLizhiFM ?
          <WithLoginBtn render={() => <div styleName="btn-join" onClick={this.gotoRecord}>参与上传</div>} /> :
          <div styleName="btn-join" onClick={this.downloadApp}>参与上传</div>
        }
      </div>
    );
  }
}

export default School;
