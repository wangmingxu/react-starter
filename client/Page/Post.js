import React from 'react';
import '../styles/post.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PostActions from 'Action/Post';
import * as MineActions from 'Action/Mine';
import api from 'utils/api';
import { Toast } from 'antd-mobile';

@connect(
  state => ({ post: state.Post }),
  dispatch => bindActionCreators({ ...PostActions, ...MineActions }, dispatch),
)
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      title: '',
    };
  }
  get activityId() {
    const { location } = this.props;
    const params = new URLSearchParams(location.search);
    return params.get('activityId');
  }
  get phone() {
    return this.state.phone;
  }
  get title() {
    return this.state.title;
  }
  submit = async () => {
    const { post, history } = this.props;
    try {
      const { data: audioId } = await api.addAudio(
        {
          ...post,
          name: this.title,
          link: this.phone,
          activityId: this.activityId,
        },
        { needAuth: true },
      );
      Toast.info('发布成功', 1);
      this.props.loadMineInfo();
      await new Promise(resolve => setTimeout(resolve, 1000));
      history.push(`/voice/${audioId}?activityId=${this.activityId}`);
    } catch (error) {
      Toast.info(error);
    }
  };
  handlePhoneChange = (e) => {
    const { value: phone } = e.target;
    this.setState({ phone });
  };
  handleTitleChange = (e) => {
    const { value: title } = e.target;
    this.setState({ title });
  };
  fixIpt = ({ target }) => {
    setTimeout(() => {
      target.scrollIntoView();
    }, 500);
  };
  render() {
    const { phone, title } = this.state;
    console.log(this.props.post);
    return (
      <React.Fragment>
        <div styleName="page-post">
          <div styleName="main">
            <div styleName="feild">
              <div styleName="lab">标题(必填)</div>
              <input
                styleName="ipt"
                onFocus={this.fixIpt}
                onChange={this.handleTitleChange}
                value={title}
                placeholder="请填写标题"
              />
            </div>
            <div styleName="feild">
              <div styleName="lab">手机号(必填)</div>
              <input
                styleName="ipt"
                type="tel"
                onFocus={this.fixIpt}
                onChange={this.handlePhoneChange}
                value={phone}
                placeholder="请填写手机号码"
              />
            </div>
            <div styleName="tips">建议通过荔枝app参与活动，以便接收后续活动信息</div>
            <div styleName="btn-submit" onClick={this.submit}>
              提交
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Post;
