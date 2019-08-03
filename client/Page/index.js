import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png'
import Kol from '@/Component/Kol';
import '../styles/index.less';

export default class index extends PureComponent {
    render() {
        return (
            <div styleName="page--index">
                <img src={logo} alt="logo" styleName="logo" />
                <div styleName="title" />
                <div styleName="kol--container">
                    <Kol />
                </div>
                <Link to="/activity-detail">
                    <div styleName="activity-detail" />
                </Link>
                <div styleName="saicheng" />
                <div styleName="rank">

                </div>
            </div>
        )
    }
}
