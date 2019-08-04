import React from 'react';
import ReactDOM from 'react-dom'
import '../styles/activity-detail.less';

const ActivityDetail = (props) => {
  const { status, onClose } = props;
  return status && (
    <div className="mask" onClick={onClose}>
      <div styleName="activity-detail-dialog" onClick={e => e.stopPropagation()}>
        <div styleName="btn-x" onClick={onClose} />
        <div styleName="section">
          <div styleName="title">海选活动规则</div>
          <div styleName="content">
            根据一汽丰田《my way》主题歌进行歌曲翻唱
            或对你心中最重要的人说出一段深藏内心很久的 话，上传含关键词
        <span styleName="highlight">#Way爱而声#</span>
            的音频
          </div>
        </div>
        <div styleName="section">
          <div styleName="title">参与方法一</div>
          <div styleName="content">
            点击专题页【参与翻唱】或【参与说说】，录制
            并上传音频
        </div>
        </div>
        <div styleName="section">
          <div styleName="title">参与方法二</div>
          <div styleName="content">
            通过荔枝APP首页右上角，录音并发布含<span styleName="highlight">#Way爱而声#</span>关键词音频
        </div>
        </div>
        <div styleName="section">
          <div styleName="title">参与方法三</div>
          <div styleName="content">
            关注<span styleName="highlight">“一汽丰田”</span>官方电台，发布含<span styleName="highlight">#Way爱而声#</span>
            关键词音频
        </div>
        </div>
        <div styleName="section">
          <div styleName="title">晋级条件</div>
          <div styleName="content">
            <p><span styleName="highlight">1</span> 海选期间，参赛音频得票数排名前八位晋级</p>
            <p><span styleName="highlight">2</span> 复赛直播期间，第一轮两组各选出一位专题页得票数排名第一晋级，第二轮六位选手专题页得票数排名前四晋级</p>
            <p><span styleName="highlight">3</span>决赛直播期间，专题页得票数排名选出冠军奖、
          二等奖及三等奖</p>
          </div>
        </div>
        <div styleName="section">
          <div styleName="title">奖项设置</div>
          <div styleName="content">
            <p><span styleName="highlight">1</span> 参与说说票数TOP3作品，香奈儿化妆品1个</p>
            <p><span styleName="highlight">2</span> 复赛及决赛落选四位选手，香奈儿香水1瓶</p>
            <p><span styleName="highlight">3</span> 冠军奖：10000元现金  二等奖：戴森吹风机
          1台  三等奖：香奈儿礼盒1套</p>
          </div>
        </div>
      </div>
    </div>

  )
};

export default ActivityDetail;

export const showDetailDialog = (props) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  ReactDOM.render(<ActivityDetail status onClose={close} {...props} />, div);

  return {
    close,
  };
};
