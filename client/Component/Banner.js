import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Banner = props => (
  <div className="banner">
    {props.logo ? <Logo /> : null}
    {props.detail ? <Link className="activity-detail" to="/detail">活动详情</Link> : null}
    {props.children}
  </div>
);

export default Banner;
