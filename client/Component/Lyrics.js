import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/lyrics.less';

const Lyrics = (props) => {
    const { status, onClose } = props;
    return (
        status && (
            <React.Fragment>
                <div styleName="opacity-layer"></div>
                <div styleName="lyrics-dialog" onClick={e => e.stopPropagation()}>
                    <div styleName="btn-x" onClick={onClose} />
                    <div styleName="scroll">
                        <div styleName="section">
                            <p>有窗 / 打开远方 / 一份感觉 / 自由的力量 / </p>
                            <p>吻别 / 手边的花 / 这熟悉的 / 爱的清香 / </p>
                            <p>初升的梦有 / 耀眼的光 / </p>
                            <p>我想见你 / 明天的模样 / </p>
                            <p>梦有 / 几分向往 / 就有几分担当 /</p>
                            <p>无间 / 身心所向 / 别在意吧 / 未满的行囊 /</p>
                        </div>
                        <div styleName="section">
                            <p>无间 / 身心所向 / 别在意吧 / 未满的行囊 / </p>
                            <p>有天 / 你终会看见 / 久违的 / 来时的模样 /</p>
                            <p>向着美丽 / 渴望的远方 / 那里有梦和花的芬芳 /</p>
                            <p>梦有 / 几分向往 / 就有几分担当 / </p>
                        </div>
                        <div styleName="section">
                            <p>所欲随心 / 为爱行我路 / </p>
                            <p>璀璨夺目 / 追天边霞雾 /</p>
                            <p>湖海森林 / 田野山琼 /</p>
                            <p>因为有你 / 世界大不同 / </p>
                            <p>牵你的手 / 我与你同步 / </p>
                            <p>I did it / My way</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    );
};

export default Lyrics;

export const showLyrics = (props) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    function close() {
        ReactDOM.unmountComponentAtNode(div);
        if (div && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    ReactDOM.render(<Lyrics status onClose={close} {...props} />, div);

    return {
        close,
    };
};
