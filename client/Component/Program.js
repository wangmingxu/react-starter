import React from 'react';
import { showShareOverlay } from '@lz-component/ShareOverlay';
import '../styles/program.less';
import { withUserAgent } from 'rc-useragent';
import { WithLoginBtn } from 'Hoc/WithLogin';
import { showDownloadDialog } from 'Component/DownloadDialog';
import { Link } from 'react-router-dom';
import { ProgramType, getPersonShareData, getSchoolShareData } from 'constant';
import classNames from 'classnames';
import * as mineActions from 'Action/Mine';
import { showVoteDialog } from 'Component/VoteDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stopPropagation } from 'utils/domHelper';
import api from 'utils/api';
import Player, { EventMap, AudioStatus } from 'Component/Player';

@connect(
  state => ({ mine: state.Mine }),
  dispatch => bindActionCreators(mineActions, dispatch),
)
@withUserAgent
class Program extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: AudioStatus.WAIT_PLAY,
      playId: -1,
    };
    this.player = null;
  }
  componentDidMount() {
    this.player = Player.getInstance();
    this.player.on(EventMap.STATUS_CHANGE, this.handlePlayerStatus);
    this.player.on('playIdChange', this.handlePlayIdChange);
  }
  componentWillUnmount() {
    this.player.off(EventMap.STATUS_CHANGE, this.handlePlayerStatus);
    this.player.off('playIdChange', this.handlePlayIdChange);
    if (this.state.playId === this.props.data.id) this.player.pause();
    this.player = null;
  }
  handlePlayerStatus=(status) => {
    this.setState({ playStatus: status });
  }
  handlePlayIdChange = (id) => {
    this.setState({ playId: id });
  }
  play = () => {
    const { data, type } = this.props;
    if (type === ProgramType.PERSONAL) {
      this.player.setAudioSrc(data.audio);
      this.player.emit('playIdChange', data.id);
    } else {
      this.openGroupPage();
    }
  }
  openGroupPage = () => {
    const action = {
      type: 3,
      id: '17878651029830272',
      extraData: {
        userId: '5095360', // 主播 id
      },
    };
    if (this.props.ua.isLizhiFM) {
      LizhiJSBridge.call('toAction', { action });
    } else {
      showDownloadDialog(action);
    }
  }
  pause = () => {
    this.player.pause();
  }
  share = async () => {
    const { ua, type, data } = this.props;
    if (ua.isLizhiFM) {
      const shareData = type === ProgramType.PERSONAL ?
        getPersonShareData(data.id) :
        getSchoolShareData(data.id);
      lz.shareUrl(shareData);
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
    const votes = await new Promise((resolve, reject) => {
      showVoteDialog({
        id: this.props.data.id,
        type: this.props.type,
        restVote: this.props.mine.myVotes,
        onVoteSuccess: resolve,
        onCancel: reject,
      });
    });
    this.props.onVote(this.props.data.id, votes);
    this.props.loadMineInfo();
  }
  render() {
    const {
      style, className, ua, data, rank, type, onClick = () => {},
    } = this.props;
    const { playStatus, playId } = this.state;
    const isSchool = type === ProgramType.SCHOOL;
    return (<div styleName="program-item" style={style} className={className} onClick={onClick}>
      <div styleName="cnt">
        {rank ? <div styleName="rank_wrap"><div styleName="rank">{rank}</div></div> : null}
        <div styleName="avatar-wrapper">
          <img
            styleName="avatar"
            alt="avatar"
            src={data.image}
            onClick={() => {
              type === ProgramType.SCHOOL && this.openGroupPage();
            }}
          />
          {type === ProgramType.SCHOOL ? null : <React.Fragment>
            {playStatus === AudioStatus.PLAYING && playId === data.id ? <div styleName="btn-control pause" onClick={stopPropagation(this.pause)} /> : <div styleName="btn-control play" onClick={stopPropagation(this.play)} />}
          </React.Fragment>}
        </div>
        <div styleName="info">
          <div styleName="name">{isSchool ? <span onClick={this.openGroupPage}>{data.assnName}</span> : <span>{data.nickName}</span>}
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

export default Program;
