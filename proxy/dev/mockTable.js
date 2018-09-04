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
  //     school: null,
  //     nickName: 'Lhahahahah?124',
  //     image: 'null2017/04/13/2595960757229352962.jpg',
  //     hasUseVotes: 0,
  //     todayVotes: 0,
  //     myVotes: 0,
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
