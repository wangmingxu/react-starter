import React from 'react';
import DetailDialog from './DetailDialog';

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
      <div>
        <span
          className="activity-detail"
          onClick={() => {
            this.setState({ showDialog: true });
          }}
        >
          活动详情
        </span>
        <DetailDialog
          showDialog={this.state.showDialog}
          onClose={() => {
            this.setState({ showDialog: false });
          }}
        />
      </div>
    );
  }
}

export default ActivityDetail;
