const httpAlias =  {
  WXAnalysis: 'POST /voice_card/v3/wx/analysis',
  APPAnalysis: 'POST /voice_card/v3/analysis',
  pollResult: 'GET /voice_card/v3/result',
  checkAppResult: 'GET /voice_card/v3/get',
  save: 'POST /voice_card/v3/wx/img/save',
  getRecommendList: 'GET https://h5live.lizhi.fm/live-web/api/v1/soundAppraiser/getRecommendList',
  trans: 'GET //oauthbiz.lizhi.fm/checkAppTrans',
};

export type HttpAlias = typeof httpAlias;

export default httpAlias;
