import React from 'react';
import '../styles/index.less';

class Index extends React.Component {
  componentDidMount() {
  }
  render() {
    return (<div styleName="index-page">
      <div styleName="logo" />
      <div styleName="btn" />
      <div styleName="tip" />
    </div>);
  }
}

export default Index;
