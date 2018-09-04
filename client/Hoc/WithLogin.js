import React from 'react';
import { connect } from 'react-redux';
import * as Global from 'Action/Global';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import PropTypes from 'prop-types';

/**
 *
 * @param {*} forceLogin 如果未登录是否强制跳转登录
 */
const WithLogin = (forceLogin = true) => (Wrapper) => {
  class WithLoginComponent extends Wrapper {
    static propTypes = {
      isLogin: PropTypes.bool.isRequired,
    }
    constructor(props) {
      super(props);
    }
    async componentDidMount() {
      const isLogin = await this.props.checkAuthStatus();
      if (!isLogin && forceLogin) {
        await this.props.login();
      }
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
export class WithLoginBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isLogin, login } = this.props;
    return (<React.Fragment>
      {
        isLogin ? this.props.render() : React.cloneElement(this.props.render(), { onClick: login })
      }
    </React.Fragment>);
  }
}

export default WithLogin;
