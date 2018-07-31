import React from 'react';
import '../styles/audio.less';
import Logo from 'Component/Logo';
import DetailDialog from 'Component/DetailDialog';
import Letter from 'Component/Letter';

class Ugc extends React.Component {
  state = {
    showDetailDialog: false,
  }
  componentDidMount() {}
  makePoster = () => {
    const { history } = this.props;
    history.push('/poster');
  }
  knowMore = () => {
    this.setState({ showDetailDialog: true });
  }
  render() {
    const { showDetailDialog } = this.state;
    return (
      <React.Fragment>
        <Logo />
        <DetailDialog
          status={showDetailDialog}
          type={2}
          onClose={() => {
            this.setState({ showDetailDialog: false });
          }}
        />
        <div styleName="audio-page">
          <Letter theme={1} />
          <div styleName="btn-poster" onClick={this.makePoster} />
          <div styleName="btn-knowMore" onClick={this.knowMore} />
        </div>
      </React.Fragment>
    );
  }
}

export default Ugc;
