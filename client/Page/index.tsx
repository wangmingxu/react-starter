import * as GlobalActions from '@/Action/Global';
import * as UserInfoActions from '@/Action/UserInfo';
import { IApplicationState } from '@/Reducer';
import JsBridgeService from '@/Service/JsBridgeService';
import { Gender, IUserInfo } from '@/types';
import { showDownloadDialog } from '@/utils/openApp';
import ClientDetectService from '@lz-service/ClientDetectService';
import { Toast } from 'antd-mobile';
import Schema from 'async-validator';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import '../styles/index.less';

const descriptor = {
  name: [
    { type: 'string', required: true, message: '请先输入用户名' },
    (rule, value, callback) => {
      const errors: string[] = [];
      if (Array.from(value).length > 10) {
        errors.push('名字长度超出限制啦/（ToT)/~');
      }
      callback(errors);
    },
  ],
  // https://github.com/yiminghe/async-validator/issues/52
  gender: {
    type: 'enum',
    enum: ['1', '2'],
    message: '请先选择性别',
    transform: val => `${val}`,
  },
  likeGender: {
    type: 'enum',
    enum: ['1', '2'],
    message: '请先选择爱好',
    transform: val => `${val}`,
  },
};
const validator = new Schema(descriptor);

interface IProp extends RouteComponentProps {
  userInfo: IUserInfo;
  setUserInfo: (info: IUserInfo) => void;
  cdServ: ClientDetectService;
  jsbServ: JsBridgeService;
  isLogin: boolean;
  login: () => any;
}

interface IState {
  userInfo: IUserInfo;
}

class Index extends PureComponent<IProp, IState> {
  public readonly state: IState = {
    userInfo: this.props.userInfo,
  };

  public async componentDidMount() {
    const {cdServ, jsbServ} = this.props;
    if (cdServ.isLizhiFM && !this.props.userInfo.name) {
      const { name } = await jsbServ.safeCall('getSessionUser')
      this.setState({ userInfo: { ...this.state.userInfo, name } });
    }
  }

  public setName = (e) => {
    const val = e.target.value;
    this.setState({ userInfo: { ...this.state.userInfo, name: val } });
  };

  public setGender = (val) => {
    this.setState({ userInfo: { ...this.state.userInfo, gender: val } });
  };

  public setLikeGender = (val) => {
    this.setState({ userInfo: { ...this.state.userInfo, likeGender: val } });
  };

  public submit = async () => {
    const { cdServ, history, isLogin } = this.props;
    if (!cdServ.isLizhiFM && !cdServ.isWeiXin) {
      showDownloadDialog({
        type: 7,
        url: location.href,
      });
    } else {
      try {
        await new Promise((resolve, reject) => {
          validator.validate(this.state.userInfo, { first: true, firstFields: true }, (error) => {
            if (error) {
              reject(error[0]);
            } else {
              resolve();
            }
          });
        });
        this.props.setUserInfo(this.state.userInfo);
        if (cdServ.isLizhiFM && !isLogin) {
          await this.props.login();
        }
        history.push('/record');
      } catch (error) {
        Toast.fail(error.message, Toast.SHORT);
      }
    }
  };

  public render() {
    const { userInfo } = this.state;
    return (
      <div styleName="page">
        <div styleName="card">
          <input
            styleName="name_ipt"
            placeholder="给自己取一个好听的名字"
            onChange={this.setName}
            value={userInfo.name}
          />
          <div styleName="form_item">
            <div styleName="label">性别：</div>
            <div styleName="radio_list">
              <div
                styleName={classNames('item', 'male', { active: userInfo.gender === Gender.Boy })}
                onClick={() => {
                  this.setGender(Gender.Boy);
                }}
              />
              <div
                styleName={classNames('item', 'female', { active: userInfo.gender === Gender.Girl })}
                onClick={() => {
                  this.setGender(Gender.Girl);
                }}
              />
            </div>
          </div>
          <div styleName="form_item">
            <div styleName="label">爱好：</div>
            <div styleName="radio_list">
              <div
                styleName={classNames('item', 'like-male', {
                  active: userInfo.likeGender === Gender.Boy,
                })}
                onClick={() => {
                  this.setLikeGender(Gender.Boy);
                }}
              />
              <div
                styleName={classNames('item', 'like-female', {
                  active: userInfo.likeGender === Gender.Girl,
                })}
                onClick={() => {
                  this.setLikeGender(Gender.Girl);
                }}
              />
            </div>
          </div>
          <button styleName="btn-submit" onClick={this.submit}>
            5秒get你的声音气质
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IApplicationState) => ({
    userInfo: state.UserInfo,
    isLogin: state.Global.isLogin,
    cdServ: state.Injector.get('cdServ'),
    jsbServ: state.Injector.get('jsbServ', {})
  }),
  dispatch => bindActionCreators({
    ...UserInfoActions, 
    ...GlobalActions}, dispatch),
)(Index);
