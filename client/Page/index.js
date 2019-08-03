import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png'
import Kol from '@/Component/Kol';
import Rank from '@/Component/Rank';
import { showRecordDialog } from '@/Component/RecordDialog';
import '../styles/index.less';

export default class index extends PureComponent {
    gotoRecord = () => {
        showRecordDialog({
            onOk: () => {
                this.props.history.push('/record');
            }
        })
    }
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
                    <Rank />
                    <div styleName="operation">
                        <div styleName="btn" onClick={this.gotoRecord}>参与翻唱</div>
                        <div styleName="btn" onClick={this.gotoRecord}>参与说说</div>
                    </div>
                </div>
                <div styleName="btn-appointment">预约试驾</div>
            </div>
        )
    }
}
