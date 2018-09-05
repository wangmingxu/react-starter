import React from 'react';
import SchoolSelector from 'Component/SchoolSelector';
import Banner from 'Component/Banner';
import '../styles/post.less';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PostActions from 'Action/Post';
import api from 'utils/api';
import { Toast } from 'antd-mobile';

@connect(
  state => ({ post: state.Post }),
  dispatch => bindActionCreators(PostActions, dispatch),
)
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      school: {},
      selectingSchool: false,
      phone: '',
      title: '',
    };
  }
  get schoolId() {
    return this.state.school.id;
  }
  get phone() {
    return this.state.phone;
  }
  get title() {
    return this.state.title;
  }
  handleSchoolChange = (school) => {
    this.setState({ school, selectingSchool: false });
  }
  submit = async () => {
    const { post, history } = this.props;
    try {
      const { data: audioId } = await api.addAudio({
        ...post,
        title: this.title,
        sId: this.schoolId,
        link: this.phone,
      }, { needAuth: true });
      Toast.info('发布成功', 1.5);
      await new Promise(resolve => setTimeout(resolve, 1500));
      history.push(`/voice/${audioId}`);
    } catch (error) {
      Toast.info(error);
    }
  }
  showSchoolSelect=() => {
    this.setState({ selectingSchool: true });
  }
  handlePhoneChange = (e) => {
    const { value: phone } = e.target;
    this.setState({ phone });
  }
  handleTitleChange = (e) => {
    const { value: title } = e.target;
    this.setState({ title });
  }
  fixIpt = ({ target }) => {
    setTimeout(() => {
      target.scrollIntoView();
    }, 500);
  }
  render() {
    const {
      selectingSchool, school, phone, title,
    } = this.state;
    console.log(this.props.post);
    return (
      <React.Fragment>
        {selectingSchool ? <SchoolSelector onSelect={this.handleSchoolChange} /> : null}
        <div styleName="page-post">
          <Banner logo detail />
          <div styleName="main">
            <div styleName="card">
              <div styleName="feild">
                <div styleName="lab">标题(必填)</div>
                <input styleName="ipt" onFocus={this.fixIpt} onChange={this.handleTitleChange} value={title} />
              </div>
              <div styleName="feild">
                <div styleName="lab">学校(必填)</div>
                <div styleName="ipt school" onClick={this.showSchoolSelect}>{school.schoolName}</div>
              </div>
              <div styleName="feild">
                <div styleName="lab">手机号(必填)</div>
                <input styleName="ipt" type="tel" onFocus={this.fixIpt} onChange={this.handlePhoneChange} value={phone} />
              </div>
            </div></div>
          <div styleName="btn-submit" onClick={this.submit}>提交</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Post;
