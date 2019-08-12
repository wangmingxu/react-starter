const initState = {
  other_vote: 0,
  detail: '',
  baidu_statis: '',
  kv_style_obj: null,
  share_image: null,
  kv_link: '',
  type: '',
  external_links_obj: null,
  common_font_color: '#FFFFFF',
  id: 47,
  title: '',
  duration_limit: 0,
  main_button_color: '#FFFFFF',
  list_color: '#FFFFFF',
  download_url: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yibasan.lizhifm&g_f=991784#opened',
  canvass_switch: 0,
  active_start: '',
  kv_style: '',
  sub_kv: null,
  multi_switch: 0,
  notice: '',
  vote_end: '',
  share_title: '',
  vote_start: '',
  jump_type: 1,
  sub_button_color: '#FFFFFF',
  vote_limit: 10,
  share_limit: 0,
  external_links: '',
  keyword: '',
  kv: null,
  share_message: '',
  app_publish: 0,
  wechat_switch: 0,
  message: '',
  sub_font_color: '#FFFFFF',
  document_switch: 0,
  notice_arr: [],
  search_field: 0,
  active_end: '',
  create_time: '',
  share_limit_total: 0,
  main_font_color: '#FFFFFF',
};

const ActivityInfo = (state = initState, action) => {
  switch (action.type) {
  case 'setActivityInfo':
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default ActivityInfo;
