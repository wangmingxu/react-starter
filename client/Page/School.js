import React from 'react';
import Banner from 'Component/Banner';
import Community from 'Component/Community';
import { NoticeBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import '../styles/school.less';

class School extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render() {
    return (
      <div styleName="page-school">
        <Banner logo={false} detail>
          <Link to="/" styleName="btn-back">返回首页</Link>
          <div styleName="scholl-name">四川大学广播电台</div>
        </Banner>
        <div styleName="notice-bar">
          <NoticeBar
            icon={<div styleName="laba" />}
            marqueeProps={{ loop: true, style: { color: '#80f2fa' } }}
            styleName="cl-notice"
          >
                为你社团打CALL，寻找最美新声
          </NoticeBar>
          <div styleName="rest-votes">剩余贡献值：10</div>
        </div>
        <input styleName="search-box" placeholder="搜索你喜爱的声音，为它打call吧" />
        <div styleName="card">
          {new Array(10).fill({}).map((el, i) => (
            <Community key={i} styleName="item" />
          ))}
        </div>
        <div styleName="btn-join">参与上传</div>
      </div>
    );
  }
}

export default School;
