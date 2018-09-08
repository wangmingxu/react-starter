function succ(data, msg = 'ok', status = 0) {
  return {
    status, data, msg,
  };
}

function fail(data, msg = 'error', status = 1) {
  return {
    status, data, msg,
  };
}

module.exports = {
  // '/newvoice/mine': (req, res) => {
  //   res.json(succ({
  //     school: {
  //       id: 83,
  //       schoolName: '广东外语外贸大学',
  //       vote: 60,
  //       assnName: '广东外语外贸大学广播台',
  //       votes: 60,
  //       image: 'https://bizadv.lizhi.fm/festatic/city/2018/newvoice/school_head/gz2.jpg',
  //       bank: '1612590',
  //       rank:1
  //     },
  //     nickName: 'mx\uD83D\uDE33\uD83C\uDFBC',
  //     image: 'http://cdn.lizhi.fm//user/2018/07/16/2681181327550609922.jpg',
  //     hasUseVotes: 20,
  //     todayVotes: 20,
  //     myVotes: 230,
  //   }));
  // },
  // '/newvoice/info': (req, res) => {
  //   res.json(succ({
  //     createTime: 1536122229264,
  //     schoolName: '电子科技大学成都学院',
  //     audio: 'http://cdn5.lizhi.fm/audio/2018/02/15/2653140969335672326_hd.mp3',
  //     vote: 0,
  //     assnName: '电子科技大学成都学院广播台',
  //     schoolRank: 1,
  //     votes: 0,
  //     image: 'null2017/04/13/2595960757229352962.jpg',
  //     sId: 35,
  //     id: 3,
  //     rank: 1,
  //     duration: 5950,
  //     school: {
  //       id: 35, bank: '17549128', schoolName: '电子科技大学成都学院', assnName: '电子科技大学成都学院广播台', image: 'https://bizadv.lizhi.fm/festatic/city/2018/newvoice/school_head/cd8.jpg', createTime: null, status: null, vote: 0,
  //     },
  //     nickName: 'Lhahahahah?124',
  //     schoolImage: 'https://bizadv.lizhi.fm/festatic/city/2018/newvoice/school_head/cd8.jpg',
  //   }));
  // },
  // '/newvoice/listMyAudio': (req, res) => {
  //   res.json(succ({
  //     pageIndex: 1,
  //     pageSize: 20,
  //     total: 1,
  //     list: [{
  //       id: 3, createTime: 1536122229264, duration: 5950, schoolName: '电子科技大学成都学院', audio: 'http://cdn5.lizhi.fm/audio/2018/02/15/2653140969335672326_hd.mp3', nickName: 'Lhahahahah?124', assnName: '电子科技大学成都学院广播台', vote: 0, schoolImage: 'https://bizadv.lizhi.fm/festatic/city/2018/newvoice/school_head/cd8.jpg', image: 'null2017/04/13/2595960757229352962.jpg', sId: 35,
  //     }],
  //     totalPage: 1,
  //     queryAll: false,
  //   }));
  // },
  '/mockfail': (req, res) => {
    res.json(fail({
      id: 957,
      name: 'Hello World',
    }));
  },
  '/activity/listLuckyDoy': (req, res) => {
    res.json(succ([
      {
        nick_name: 'T🌃',
        band: '61035519',
        prize: '荔枝FM抱枕1',
        lucky_time: '2017-12-06 16:50:52',
      },
      {
        nick_name: '巴金bu加糖',
        band: '242545',
        prize: '荔枝FM抱枕2',
        lucky_time: '2017-12-06 16:52:46',
      },
      {
        nick_name: 'Nicholas🤔',
        band: '12750',
        prize: '小米秤3',
        lucky_time: '2017-12-07 11:51:45',
      },
      // {
      //   nick_name: 'T🌃',
      //   band: '61035519',
      //   prize: '荔枝FM抱枕4',
      //   lucky_time: '2017-12-08 16:50:52',
      // },
      // {
      //   nick_name: '巴金bu加糖',
      //   band: '242545',
      //   prize: '荔枝FM抱枕5',
      //   lucky_time: '2017-12-09 16:52:46',
      // },
      // {
      //   nick_name: 'Nicholas🤔',
      //   band: '12750',
      //   prize: '小米秤6',
      //   lucky_time: '2017-12-10 11:51:45',
      // },
    ]));
  },
};
