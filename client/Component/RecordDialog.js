import React from 'react';
import '../styles/record-dialog.less';
import ReactDOM from 'react-dom';

function RecordDialog(props) {
    const { status, onClose, onOk } = props;
    return status ? (<div className="mask" onClick={onClose}>
        <div styleName="record-dialog">
            <div styleName="icon-record" />
            <div styleName="tip">即将前往录音界面，录音完成后，</div>
            <div styleName="tip">请按<span styleName="highlight">#Way爱而声#xxx</span>命名</div>
            <div styleName="btn" onClick={onOk}>去录音</div>
        </div>
    </div>) : null
}

export default RecordDialog;

export const showRecordDialog = (props) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    function close() {
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    ReactDOM.render(<RecordDialog status onClose={close} {...props} />, div);

    return {
        close,
    };
};
