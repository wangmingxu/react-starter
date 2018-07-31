import React from 'react';
import DetailDialog from './DetailDialog';
import DetailBtn from 'assets/btn-activity-detail.png';

class ActivityDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <img
          src={DetailBtn}
          alt="activity-detail"
          className="activity-detail"
          onClick={() => {
            this.setState({ showDialog: true });
          }}
        />
        <DetailDialog
          type={1}
          status={this.state.showDialog}
          onClose={() => {
            this.setState({ showDialog: false });
          }}
        />
      </React.Fragment>
    );
  }
}

export default ActivityDetail;
