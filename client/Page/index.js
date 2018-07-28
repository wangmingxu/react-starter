import React from 'react';
import '../styles/index.less';

class Index extends React.Component {
  componentDidMount() {
  }
  navToKol = () => {
    const { history } = this.props;
    history.push('/kol');
  }
  render() {
    return (<div styleName="index-page">
      <div styleName="logo" />
      <div styleName="btn" onClick={this.navToKol} />
      <div styleName="tip" />
    </div>);
  }
}

export default Index;
