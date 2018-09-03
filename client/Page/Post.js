import React from 'react';
import SchoolSelector from 'Component/SchoolSelector';
import Banner from 'Component/Banner';
import '../styles/post.less';

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
  submit = () => {
    console.log(this.schoolId);
    console.log(this.title);
    console.log(this.phone);
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
                <input styleName="ipt" onFocus={this.fixIpt} onChange={this.handlePhoneChange} value={phone} />
              </div>
            </div></div>
          <div styleName="btn-submit" onClick={this.submit}>提交</div>
        </div>
      </React.Fragment>
    );
  }
}

export default Post;
