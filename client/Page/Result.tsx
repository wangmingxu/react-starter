import * as ResultActions from '@/Action/Result';
import avatar from '@/assets/avatar';
import Poster from '@/Component/Poster';
import { voiceToneMap } from '@/constant';
import { IApplicationState } from '@/Reducer';
import ServiceConfig from '@/Service/config';
import JsBridgeService from '@/Service/JsBridgeService';
import { Gender, HttpAliasMap, IResult, IUserInfo } from '@/types';
import { trackClickEvent } from '@/utils/domHelper';
import preload from '@/utils/preload';
import AudioPlayerService from '@common-service/AudioPlayerService';
import ClientDetectService from '@lz-service/ClientDetectService';
import jsonp from 'jsonp';
import throttle from 'lodash/throttle';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import '../styles/result.less';

interface IProps extends RouteComponentProps<{ id: string }> {
  poster: string;
  result: IResult;
  userInfo: IUserInfo;
  cdServ: ClientDetectService;
  jsbServ: JsBridgeService;
  player: AudioPlayerService;
  httpAlias: HttpAliasMap;
}

interface IState {
  recommendList: any[];
  showZiyaAdv: boolean;
}

class Result extends PureComponent<IProps, IState> {
  get analysisId() {
    const { match } = this.props;
    return match.params.id;
  }

  get likeGender() {
    const {
      voiceMan: { matchType },
    } = this.props.result;
    const criticalVal = voiceToneMap.length / 2;
    return matchType <= criticalVal ? Gender.Boy : Gender.Girl;
  }

  public state: IState = {
    recommendList: [],
    showZiyaAdv: false,
  };

  public share = throttle(
    (type) => {
      const imgdata = this.props.poster.split(',')[1];
      this.props.jsbServ
        .safeCall('shareImage', {
          image: imgdata,
          text: ServiceConfig.shareInfo.desc,
          platform: type,
        })
        .then((ret) => {
          // lz.alt(ret);
          if (ret.status === 'success') {
            console.log('分享成功');
          }
        });
    },
    1500,
    { trailing: false },
  );

  public shareToCircle = throttle(
    () => {
      this.props.jsbServ.safeCall('toAction', {
        action: {
          type: 43,
          id: '2686341451598543445',
        },
      });
    },
    1500,
    { trailing: false },
  );

  public save = throttle(
    () => {
      const imgdata = this.props.poster.split(',')[1];
      this.props.jsbServ
        .safeCall('saveImage', {
          image: imgdata,
        })
        .then((ret) => {
          // lz.alt(rst);
          if (ret.status === 'success') {
            console.log('保存成功');
          }
        });
    },
    1500,
    { trailing: false },
  );

  public componentDidMount() {
    if (this.props.cdServ.isLizhiFM) {
      this.loadRecommend();
      this.checkZiyaStatus();
    }
    preload(this.props.result.voiceMan.voiceManAudioUrl);
  }

  public loadRecommend = () => {
    this.props.httpAlias.getRecommendList().then((rst) => {
      if (rst.code === 0) {
        this.setState({
          recommendList: rst.data || [],
        });
      }
    });
  };

  // 打开app声音页
  public openVoice = () => {
    const [, userId, id] = this.props.result.voiceMan.voiceManLink.match(/\/(\d+)\/(\d+)$/);
    const action = {
      type: 28,
      id, // 声音 id
      extraData: {
        userId, // 主播 id
      },
    };
    this.props.jsbServ.safeCall('toAction', { action });
  };

  public navToVoicePage = () => {
    const { history, result } = this.props;
    this.props.player.setAudioSrc(result.voiceMan.voiceManAudioUrl, true);
    history.push(`/voice/${this.analysisId}`);
  };

  public navToZiya = async () => {
    // const { deviceId } = await this.props.jsbServ.safeCall('getAppInfo');
    // jsonp(`//h5zy.lizhifm.com/api/v1/lizhi/promo/savesee?deviceId=${deviceId}`);
    location.href = 'https://gio.ren/reJmmvQ';
  };

  public checkZiyaStatus = async () => {
    const { deviceId } = await this.props.jsbServ.safeCall('getAppInfo');
    const hasSee = await new Promise((resolve, reject) => {
      jsonp(`//h5zy.lizhifm.com/api/v1/lizhi/promo/see?deviceId=${deviceId}`, {}, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
    this.setState({ showZiyaAdv: !hasSee });
  };

  public render() {
    const { poster, result, userInfo } = this.props;
    const { recommendList, showZiyaAdv } = this.state;
    const recommendColor = result.color && result.color.replace('0x', '#');
    return (
      <div styleName="result-page" data-showZiya={showZiyaAdv}>
        <div styleName="content">
          <img styleName="picture" src={poster} alt="poster" key="poster" />
          <Poster
            key="result"
            displayType="dom"
            reportData={result}
            userInfo={userInfo}
          />
          <div styleName="save-tip" key="save-tip" />
          <div onClick={trackClickEvent(this.navToVoicePage, '倾听Ta的心声')} styleName="btn-listen-voice" key="voice" />
          {showZiyaAdv ? (
            <div styleName="ziya-match" onClick={trackClickEvent(this.navToZiya, '跳转吱呀')}>
              <div styleName="panl-title">声音恋人</div>
              <div styleName="panl-content">
                根据你的声音气质
                <br />
                为你找到一位声音恋人
              </div>
              <div styleName="ziya-btn" />
              <img
                alt="avatar"
                src={avatar[result.voiceMan.matchType - 1]}
                styleName="match-avatar"
              />
            </div>
          ) : null}
          <div styleName="test-fate" key="test-fate">
            <div styleName="tit">探知你们的缘分</div>
            <div styleName="btn" onClick={trackClickEvent(this.openVoice, '打开app声音页')}>
              <div
                style={{ backgroundImage: `url(${result.voiceMan.voiceManCover})` }}
                styleName="anchor-avatar"
              />
              {voiceToneMap[result.voiceMan.matchType - 1]}
            </div>
          </div>
          {recommendList.length > 0 ? (
            <div styleName="recommend" key="recommend" style={{ backgroundColor: recommendColor }}>
              <div styleName="tit">推荐直播</div>
              <div styleName="list">
                {recommendList.map(item => (
                  <div
                    styleName="item"
                    key={item.liveId}
                    onClick={trackClickEvent(() => {
                      location.href = `lizhifm://www.lizhi.fm?clientparams=17,${item.liveId},${
                        item.radioId
                      }`;
                    }, '打开推荐直播')}
                  >
                    <img src={item.imageUrl} alt="cover" styleName="cover" />
                    <div styleName="name">{item.liveTitle}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div styleName="operation-bar" key="operation-bar">
          <Link styleName="btn-operate remake" to="/" onClick={trackClickEvent(null, '重新鉴定')}>
            重新鉴定
          </Link>
          <div styleName="btn-operate save" onClick={trackClickEvent(this.save, '保存图片')}>
            保存图片
          </div>
          <div
            styleName="btn-share wb"
            onClick={trackClickEvent(() => {
              this.share(1);
            }, '分享图片')}
          >
            分享到微博
          </div>
          <div
            styleName="btn-share wx"
            onClick={trackClickEvent(() => {
              this.share(23);
            }, '分享图片')}
          >
            分享到朋友圈
          </div>
          <div styleName="btn-share-circle" onClick={trackClickEvent(this.shareToCircle, '跳转声鉴交流圈')}>
            分享到声鉴交流圈
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IApplicationState) => ({
    poster: state.Poster,
    result: state.Result,
    userInfo: state.UserInfo,
    cdServ: state.Injector.get('cdServ'),
    jsbServ: state.Injector.get('jsbServ', {}),
    player: state.Injector.get('player', {}),
    httpAlias: state.Injector.get('$http').alias,
  }),
  dispatch => bindActionCreators(ResultActions, dispatch),
)(Result);
