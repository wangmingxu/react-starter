import React from 'react';
import '../styles/vote-dialog.less';
import ReactDOM from 'react-dom';
import api from 'utils/api';
import { ProgramType } from 'constant';
import { Toast } from 'antd-mobile';

class VoteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  vote = async () => {
    const {
      type, id, onVoteSuccess, onClose,
    } = this.props;
    if (type === ProgramType.SCHOOL) {
      await api.voteSchool({ sId: id }, { needAuth: true });
    } else {
      await api.vote({ id }, { needAuth: true });
    }
    onClose();
    Toast.info('投票成功', 1);
    onVoteSuccess(10);
  }
  voteAll = async () => {
    const {
      type, id, onVoteSuccess, restVote, onClose,
    } = this.props;
    if (type === ProgramType.SCHOOL) {
      await api.allInSchool({ sId: id }, { needAuth: true });
    } else {
      await api.allIn({ id }, { needAuth: true });
    }
    onClose();
    Toast.info('投票成功', 1);
    onVoteSuccess(restVote);
  }
  cancel = () => {
    this.props.onClose();
    this.props.onCancel();
  }
  render() {
    const { restVote, status } = this.props;
    return status ? (<div className="mask" onClick={this.cancel}>
      <div styleName="vote-dialog">
        <div styleName="tip">你当前有{restVote}贡献值，请选择贡献票数</div>
        <div styleName="btn" onClick={this.vote}>贡献10票</div>
        <div styleName="btn" onClick={this.voteAll}>贡献全部</div>
      </div>
    </div>) : null;
  }
}

export default VoteDialog;

export const showVoteDialog = (props) => {
  if (props.restVote === 0) {
    Toast.info('你今天的投票次数已用完', 1.5);
  } else {
    const div = document.createElement('div');
    document.body.appendChild(div);

    function close() {
      ReactDOM.unmountComponentAtNode(div);
      if (div && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }

    ReactDOM.render(<VoteDialog status onClose={close} {...props} />, div);

    return {
      close,
    };
  }
};
