import React from 'react';
import Banner from 'Component/Banner';
import Program from 'Component/Program';
import '../styles/mine.less';
import api from 'utils/api';
import { connect } from 'react-redux';
import { ProgramType } from 'constant';

@connect(
  state => ({ mine: state.Mine }),
  dispatch => ({ dispatch }),
)
class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myAudioList: [],
    };
  }
  componentDidMount() {
    this.loadMyAudio();
  }
  loadMyAudio = async () => {
    const { data: { list } } = await api.listMyAudio({ page: 1, pageSize: 50 }, { needAuth: true });
    const _list = list.map((item) => {
      const { rank, ...other } = item;
      return other;
    });
    this.setState({ myAudioList: _list });
  }
  render() {
    const { mine } = this.props;
    const { myAudioList } = this.state;
    return (
      <div styleName="page-mine">
        <Banner logo detail />
        <div styleName="panl">
          <div styleName="panl-title">
            <div styleName="avatar-wrapper">
              <img
                styleName="avatar"
                src={mine.image}
                alt="avatar"
              />
            </div>
            <div styleName="nickname">{mine.nickName}</div>
          </div>
          <div styleName="panl-content">
            {
              myAudioList.length > 0 ? myAudioList.map(item => (
                <Program
                  key={item.id}
                  styleName="item"
                  data={item}
                  type={ProgramType.PERSONAL}
                  onVote={() => {
                    this.loadMyAudio();
                  }}
                />
              )) : <div styleName="empty">还没有上传新的声音</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Mine;
