import React from 'react';
import '../styles/kol.less';
import Logo from 'Component/Logo';
import ReactSwipe from 'react-swipe';

class Kol extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <ReactSwipe
        swipeOptions={{ continuous: false }}
        style={{
          container: ({
            height: '100%',
            overflow: 'hidden',
            visibility: 'hidden',
            position: 'relative',
          }),
          wrapper: {
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
          },
          child: {
            float: 'left',
            width: '100%',
            position: 'relative',
            transitionProperty: 'transform',
          },
        }}
      >
        <div styleName="kol-page">
          <Logo />
          <div styleName="book" />
          <div styleName="btn" />
          <div styleName="tip" />
        </div>
        <div styleName="kol-page">
          <Logo />
        </div>
      </ReactSwipe>
    );
  }
}

export default Kol;
