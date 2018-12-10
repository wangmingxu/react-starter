import * as PosterActions from '@/Action/Poster';
import * as ResultActions from '@/Action/Result';
import analysisingImg from '@/assets/voicereport/bg-analysising.png';
import loadingImg from '@/assets/voicereport/bg-loading.png';
import Poster from '@/Component/Poster';
import { loadingTips } from '@/constant';
import { IApplicationState } from '@/Reducer';
import { HttpAliasMap, IResult, IUserInfo } from '@/types';
import { delay } from '@/utils/promisify';
import ClientDetectService from '@lz-service/ClientDetectService';
import { Toast } from 'antd-mobile';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import '../styles/poster.less';

interface IProps extends RouteComponentProps<{id: string}> {
  setPosterData: (poster: string) => void;
  pollResult: (analysisId: string) => any;
  result: IResult;
  userInfo: IUserInfo;
  httpAlias: HttpAliasMap;
  cdServ: ClientDetectService;
}

interface IState {
  isGenerating: boolean;
  showVoiceLayout: boolean;
  loadingTipIndex: number;
}

class Loading extends PureComponent<IProps, IState> {
  public readonly state: IState = {
    isGenerating: false,
    showVoiceLayout: false,
    loadingTipIndex: 0,
  };

  public lTimer: number;

  public tTimer: number;

  get analysisId() {
    const { match } = this.props;
    return match.params.id;
  }

  public componentDidMount() {
    this.lTimer = setInterval(() => {
      this.setState({ showVoiceLayout: !this.state.showVoiceLayout });
    }, 1000);
    this.tTimer = setInterval(() => {
      const { loadingTipIndex } = this.state;
      if (loadingTipIndex < loadingTips.length - 1) {
        this.setState({ loadingTipIndex: loadingTipIndex + 1 });
      }
    }, 1500);
  }

  public componentWillUnmount() {
    clearInterval(this.lTimer);
    clearInterval(this.tTimer);
  }

  public startTask = async () => {
    const taskP = async () => {
      const html2canvas = await this.loadHtml2canvas();
      await this.loadData();
      await new Promise((resolve) => {
        this.setState({ isGenerating: true }, resolve);
      });
      const imgData = await this.GeneratePoster(html2canvas);
      this.setState({ isGenerating: false });
      if (this.props.cdServ.isWeiXin) {
        try {
          const {
            data: { img },
          } = await this.props.httpAlias.save(imgData.split(',')[1], {
            headers: {
              'Content-Type': 'text/plain',
            },
            timeout: 5000,
          });
          this.props.setPosterData(img);
        } catch (error) {
          this.props.setPosterData(imgData);
        }
      } else {
        this.props.setPosterData(imgData);
      }
    };
    const minWaitTime = +this.analysisId ? 4000 : 1500;
    await Promise.all([taskP(), delay(minWaitTime)]);
    this.props.history.replace(`/result/${this.analysisId}`);
  };

  public loadHtml2canvas = () => (
    new Promise(resolve => {
      require.ensure([], (require) => {
        const html2canvas = require('html2canvas');
        resolve(html2canvas);
      }, console.log, 'html2canvas')
    })
  )

  public loadData = async () => {
    // 如果analysisId为0则已经在启动时(已录过)获取了数据
    if (+this.analysisId) {
      try {
        await this.props.pollResult(this.analysisId);
      } catch (error) {
        Toast.fail('啊噢~录音被外星人偷走了重录一次吧 /（ToT)/~', Toast.SHORT);
        await Promise.reject(error);
      }
    }
  };

  public GeneratePoster = async (html2canvas) => {
    try {
      const canvas = await html2canvas(document.getElementById('poster'), {
        useCORS: true,
        scale: this.props.cdServ.isAndroid ? window.devicePixelRatio : 1,
      });
      const imgData = canvas.toDataURL('image/jpeg');
      if (imgData.slice(0, 15).length < 15) {
        await Promise.reject(new Error('生成图片失败'));
      }
      return imgData;
    } catch (error) {
      Toast.fail(error, Toast.SHORT);
      return Promise.reject(error);
    }
  };

  public render() {
    const { isGenerating, showVoiceLayout, loadingTipIndex } = this.state;
    const { result, userInfo } = this.props;
    return [
      +this.analysisId ? (
        <div styleName="analysising" key="analysising">
          <img src={analysisingImg} alt="analysising" styleName="bg" onLoad={this.startTask} />
          <div styleName="voice-layout" style={{ opacity: showVoiceLayout ? 1 : 0 }} />
          <div styleName="tip">
            {loadingTips[loadingTipIndex]!.map((item, i) => (
              <div styleName="text" key={i}>
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div styleName="loading" key="loading">
          <img src={loadingImg} alt="loading" styleName="bg" onLoad={this.startTask} />
          <div styleName="notes" />
        </div>
      ),
      isGenerating ? (
        <Poster key="poster" displayType="img" reportData={result} userInfo={userInfo}/>
      ) : null,
    ];
  }
}

export default connect(
  (state: IApplicationState) => ({
    result: state.Result,
    userInfo: state.UserInfo,
    cdServ: state.Injector.get('cdServ'),
    httpAlias: state.Injector.get('$http').alias,
  }),
  dispatch => bindActionCreators({ ...ResultActions, ...PosterActions }, dispatch),
)(Loading);
