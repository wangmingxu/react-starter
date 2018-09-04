import React from 'react';
import fuzzy from 'fuzzy';
import debounce from 'lodash/debounce';
import '../styles/school-selector.less';
import api from 'utils/api';

class SchoolSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      result: [],
    };
  }
  async componentDidMount() {
    await this.loadList();
    this.setState({ result: this.state.list });
  }
  get schoolList() {
    return this.state.list.map(item => item.schoolName);
  }
  loadList = async () => {
    const { data } = await api.listAllSchool();
    this.setState({ list: data });
  };
  search = debounce((val) => {
    const result = fuzzy.filter(val, this.schoolList).map(el => this.state.list[el.index]);
    this.setState({ result });
  }, 250);
  render() {
    const { result } = this.state;
    const { onSelect } = this.props;
    return (<div styleName="s-container">
      <input
        styleName="search-box"
        placeholder="搜索你的学校"
        onChange={(e) => {
          this.search(e.target.value);
        }}
      />
      <div styleName="list">
        {result.map(item => (
          <div
            styleName="item"
            key={item.id}
            onClick={() => {
              onSelect(item);
            }}
          >{item.schoolName}</div>
        ))}
      </div>
    </div>);
  }
}

export default SchoolSelector;
