import React from 'react';

const DetailDialog = (props) => {
  const { status, onClose, type } = props;
  return status ? (
    <div className="mask">
      {type === 1 ? (
        <div className="detail-dialog">
          <div className="activity-theme">纸短情长，让我们大声说爱</div>
          <div className="content">
            <div className="sub-tit">如何参与</div>
            1.倾听完告白小能手的声音情书后，点击 【说出我的爱】进入录音页面。<br />
            2.点击【开始录音】即可录制上传音频， 可根据声音情书文本录制，也支持自定义 告白。<br />
            3.上传成功后，会生成声音情书分析结果， 听听你的情话究竟有多甜有多撩！<br />
            你的声音还有可能在大悦城“Joy, up to Love”线下展览中展出哦~
          </div>
        </div>
      ) : (
        <div className="detail-dialog">
          <div className="content">
            <div className="sub-tit">展览详情</div>
            荔枝APP做为深度合作伙伴，参与大悦城 发起的“Joy, up to Love” 2018全国品牌
            活动，在8月10日-23日，于北京朝阳、上 海、天津、成都、沈阳、烟台全部大悦城
            展出，旨在一起聚焦当下年轻人的情感世 界，探索对内心真爱的表达。<br />
            荔枝将通过声音情书方式于8月17日-9月17 日出展北京西单大悦城“Joy, up to Love—
            —情·书”特展。
            <br />请你，大胆来，放肆爱。
          </div>
          <div className="download-app" />
        </div>
      )}
      <div className="iknowBtn" onClick={onClose} />
    </div>
  ) : null;
};

export default DetailDialog;
