import React from 'react';
import { connect } from 'react-redux';
import * as Global from 'Action/Global';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { preventDefault } from 'utils/domHelper';

/**
 *
 * @param {*} forceLogin 如果未登录是否强制跳转登录
 * @param {*} cb 登录完之后的回调
 */
const WithLogin = (forceLogin = true, cb) => (Wrapper) => {
  class WithLoginComponent extends Wrapper {
    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
    }
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      const isLogin = await this.props.checkAuthStatus();
      if (!isLogin) {
        if (forceLogin) {
          await this.props.login();
        } else {
          await new Promise((resolve) => {
            lz.on('user:login', resolve);
          });
        }
      }
      cb && cb(this.props.dispatch);
    }
    render() {
      const { isLogin } = this.props;
      return ((!isLogin && forceLogin) ? null : <Wrapper {...this.props} />);
    }
  }
  return connect(
    state => ({ isLogin: get(state, ['Global', 'isLogin']) }),
    dispatch => bindActionCreators(Global, dispatch),
  )(WithLoginComponent);
};

@connect(
  state => ({ isLogin: get(state, ['Global', 'isLogin']) }),
  dispatch => bindActionCreators(Global, dispatch),
)
class WithLoginBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isLogin, login } = this.props;
    return (<React.Fragment>
      {
        isLogin ?
          this.props.render() :
          React.cloneElement(this.props.render(), { onClick: preventDefault(login) })
      }
    </React.Fragment>);
  }
}

export default WithLogin;

export { WithLoginBtn };
