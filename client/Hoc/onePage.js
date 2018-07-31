import React from 'react';
import { findDOMNode } from 'react-dom';

const threshold = 150;

export default class onePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      offsetHeight: 0,
    };
  }
  componentDidMount() {
    const docHeight = document.documentElement.clientHeight;
    const pageEle = findDOMNode(this); //eslint-disable-line
    const pageHeight = pageEle.clientHeight;
    const offsetHeight = Math.abs(pageHeight - docHeight);
    if (offsetHeight <= threshold) {
      const scale = docHeight / pageHeight;
      this.setState({ scale, offsetHeight });
    }
  }
  render() {
    return this.props.render(this.state);
  }
}
