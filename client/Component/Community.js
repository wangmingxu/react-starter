import React from 'react';
import { showShareOverlay } from '@lz-component/ShareOverlay';
import '../styles/community.less';
import { withUserAgent } from 'rc-useragent';
import { WithLoginBtn } from 'Hoc/WithLogin';
import { showDownloadDialog } from 'Component/DownloadDialog';
import { Link } from 'react-router-dom';
import { ProgramType } from 'constant';
import classNames from 'classnames';
import * as mineActions from 'Action/Mine';
import { showVoteDialog } from 'Component/VoteDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stopPropagation } from 'utils/domHelper';
import api from 'utils/api';

@connect(
  state => ({ mine: state.Mine }),
  dispatch => bindActionCreators(mineActions, dispatch),
)
@withUserAgent
class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  share = async () => {
    const { ua } = this.props;
    if (ua.isLizhiFM) {
      lz.shareUrl({
        url: location.href,
        title: window.shareData.title,
        desc: window.shareData.desc, // 分享的描述
        'image-url': window.shareData.imgUrl, // 分享的图片
      });
      await new Promise((resolve, reject) => {
        lz.on('shareFinish', (ret) => {
          if (ret.statusCode === 0) {
            resolve();
          } else {
            reject();
          }
        });
      });
      await api.getShareVote({}, { needAuth: true });
      this.props.loadMineInfo();
    } else {
      showShareOverlay();
    }
  }
  downloadApp = () => {
    showDownloadDialog({
      type: 7,
      url: location.href,
    });
  }
  vote = async () => {
    await new Promise((resolve) => {
      showVoteDialog({
        id: this.props.id,
        restVote: this.props.mine.myVotes,
        onVoteSuccess: resolve,
      });
    });
    this.loadVoiceInfo();
    this.props.loadMineInfo();
  }
  render() {
    const {
      style, className, ua, data, rank, type, onClick = () => {},
    } = this.props;
    const isSchool = type === ProgramType.SCHOOL;
    return (<div styleName="community-item" style={style} className={className} onClick={onClick}>
      <div styleName="cnt">
        {rank ? <div styleName="rank_wrap"><div styleName="rank">{rank}</div></div> : null}
        <img styleName="avatar" alt="avatar" src={data.image} />
        <div styleName="info">
          <div styleName="name">{isSchool ? data.assnName : data.nickName}
            {isSchool ? null : <div styleName="s-votes">新声值：{data.vote}</div>}
          </div>
          {isSchool ?
            (<div styleName="votes">新声值：{data.vote}
              {/* <span styleName="add">+1</span> */}
            </div>) :
            (<div styleName="title">{data.title}</div>)
          }
          <div styleName={classNames('operation', { withSchool: !isSchool })}>
            {isSchool ? null : <div styleName="schoolName">{data.schoolName}</div>}
            {ua.isLizhiFM ?
              <WithLoginBtn render={() => <div styleName="btn btn-vote" onClick={stopPropagation(this.vote)}>贡献</div>} /> :
              <div styleName="btn btn-vote" onClick={stopPropagation(this.downloadApp)}>贡献</div>
            }
            {isSchool ? <Link styleName="btn btn-listen" to={`/school/${data.id}`}>听新声</Link> : null}
            <div styleName="btn btn-share" onClick={stopPropagation(this.share)}>转发</div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Community;
