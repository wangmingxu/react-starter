webpackJsonp([3],{"11":function(e,t,n){(function(t){!function(t){var n=t.babelHelpers={};n.typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n.jsx=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,o,r){var i=t&&t.defaultProps,a=arguments.length-3;if(n||0===a||(n={}),n&&i)for(var u in i)void 0===n[u]&&(n[u]=i[u]);else n||(n=i||{});if(1===a)n.children=r;else if(a>1){for(var c=Array(a),s=0;s<a;s++)c[s]=arguments[s+3];n.children=c}return{"$$typeof":e,"type":t,"key":void 0===o?null:""+o,"ref":null,"props":n,"_owner":null}}}(),n.asyncIterator=function(e){if("function"==typeof Symbol){if(Symbol.asyncIterator){var t=e[Symbol.asyncIterator];if(null!=t)return t.call(e)}if(Symbol.iterator)return e[Symbol.iterator]()}throw new TypeError("Object is not async iterable")},n.asyncGenerator=function(){function AwaitValue(e){this.value=e}function AsyncGenerator(e){function send(e,o){return new Promise(function(r,i){var a={"key":e,"arg":o,"resolve":r,"reject":i,"next":null};n?n=n.next=a:(t=n=a,resume(e,o))})}function resume(t,n){try{var o=e[t](n),r=o.value;r instanceof AwaitValue?Promise.resolve(r.value).then(function(e){resume("next",e)},function(e){resume("throw",e)}):settle(o.done?"return":"normal",o.value)}catch(i){settle("throw",i)}}function settle(e,o){switch(e){case"return":t.resolve({"value":o,"done":!0});break;case"throw":t.reject(o);break;default:t.resolve({"value":o,"done":!1})}t=t.next,t?resume(t.key,t.arg):n=null}var t,n;this._invoke=send,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(AsyncGenerator.prototype[Symbol.asyncIterator]=function(){return this}),AsyncGenerator.prototype.next=function(e){return this._invoke("next",e)},AsyncGenerator.prototype.throw=function(e){return this._invoke("throw",e)},AsyncGenerator.prototype.return=function(e){return this._invoke("return",e)},{"wrap":function(e){return function(){return new AsyncGenerator(e.apply(this,arguments))}},"await":function(e){return new AwaitValue(e)}}}(),n.asyncGeneratorDelegate=function(e,t){function pump(n,r){return o=!0,r=new Promise(function(t){t(e[n](r))}),{"done":!1,"value":t(r)}}var n={},o=!1;return"function"==typeof Symbol&&Symbol.iterator&&(n[Symbol.iterator]=function(){return this}),n.next=function(e){return o?(o=!1,e):pump("next",e)},"function"==typeof e.throw&&(n.throw=function(e){if(o)throw o=!1,e;return pump("throw",e)}),"function"==typeof e.return&&(n.return=function(e){return pump("return",e)}),n},n.asyncToGenerator=function(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function step(o,r){try{var i=t[o](r),a=i.value}catch(u){return void n(u)}if(!i.done)return Promise.resolve(a).then(function(e){step("next",e)},function(e){step("throw",e)});e(a)}return step("next")})}},n.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},n.createClass=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),n.defineEnumerableProperties=function(e,t){for(var n in t){var o=t[n];o.configurable=o.enumerable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,n,o)}return e},n.defaults=function(e,t){for(var n=Object.getOwnPropertyNames(t),o=0;o<n.length;o++){var r=n[o],i=Object.getOwnPropertyDescriptor(t,r);i&&i.configurable&&void 0===e[r]&&Object.defineProperty(e,r,i)}return e},n.defineProperty=function(e,t,n){return t in e?Object.defineProperty(e,t,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=n,e},n.extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},n.get=function get(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:get(r,t,n)}if("value"in o)return o.value;var i=o.get;if(void 0!==i)return i.call(n)},n.inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},n.instanceof=function(e,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?t[Symbol.hasInstance](e):e instanceof t},n.interopRequireDefault=function(e){return e&&e.__esModule?e:{"default":e}},n.interopRequireWildcard=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t},n.newArrowCheck=function(e,t){if(e!==t)throw new TypeError("Cannot instantiate an arrow function")},n.objectDestructuringEmpty=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")},n.objectWithoutProperties=function(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n},n.possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},n.selfGlobal=void 0===t?self:t,n.set=function set(e,t,n,o){var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var i=Object.getPrototypeOf(e);null!==i&&set(i,t,n,o)}else if("value"in r&&r.writable)r.value=n;else{var a=r.set;void 0!==a&&a.call(o,n)}return n},n.slicedToArray=function(){function sliceIterator(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(o=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(c){r=!0,i=c}finally{try{!o&&u["return"]&&u["return"]()}finally{if(r)throw i}}return n}return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return sliceIterator(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n.slicedToArrayLoose=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e)){for(var n,o=[],r=e[Symbol.iterator]();!(n=r.next()).done&&(o.push(n.value),!t||o.length!==t););return o}throw new TypeError("Invalid attempt to destructure non-iterable instance")},n.taggedTemplateLiteral=function(e,t){return Object.freeze(Object.defineProperties(e,{"raw":{"value":Object.freeze(t)}}))},n.taggedTemplateLiteralLoose=function(e,t){return e.raw=t,e},n.temporalRef=function(e,t,n){if(e===n)throw new ReferenceError(t+" is not defined - temporal dead zone");return e},n.temporalUndefined={},n.toArray=function(e){return Array.isArray(e)?e:Array.from(e)},n.toConsumableArray=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)},e.exports=n}(void 0===t?self:t)}).call(t,n(43))},"150":function(e,t,n){"use strict";function SetDivision(e){return{"type":"SetDivision","data":e}}function GetDivision(){return function(e){return u.getCity().then(function(t){var n=t.data.substr(0,2);e(SetDivision(c["b"].indexOf(n)>-1?n:"未知"))}).catch(function(e){}).finally(function(){})}}function toggleAuthStatus(e){return{"type":"toggleAuthStatus","isLogin":e}}function collectErrMsg(e){return{"type":"errMsg","msg":e}}var o={};n.d(o,"toggleAuthStatus",function(){return toggleAuthStatus}),n.d(o,"collectErrMsg",function(){return collectErrMsg});var r=n(82),i=n.n(r),a=(n(11),function(e){var t=e;return Object.keys(t).reduce(function(e,n){return e[n]=function(e){return"string"==typeof t[n]?i()({"url":t[n],"data":e}):t[n](e)},e},{})}({"getCity":"/hangzhou/singleDog/getCity","mineSchool":"/oldSchool/mineSchool","loadNotice":"/oldSchool/loadNotice","listFireSchool":"/oldSchool/listFireSchool","searchSchool":"/oldSchool/searchSchool","addSchool":"/oldSchool/addSchool","addQqGroup":"/oldSchool/addQqGroup","schoolInfo":"/oldSchool/schoolInfo","listAudio":"/oldSchool/listAudio","addAudio":"/oldSchool/addAudio","audioInfo":"/oldSchool/audioInfo","loadAudioCount":"/oldSchool/loadAudioCount","mineAudio":"/oldSchool/mineAudio","trans":"//oauthbiz.lizhi.fm/checkAppTrans"})),u=a,c=n(42);n(11);n.d(t,"b",function(){return SetDivision}),n.d(t,"a",function(){return GetDivision}),n.d(t,"c",function(){return o});n(11)},"151":function(e,t,n){"use strict";function isIE(){return i.indexOf("Trident")>-1}function isOpera(){return i.indexOf("Presto")>-1}function isWebKit(){return i.indexOf("AppleWebKit")>-1}function isFireFox(){return i.indexOf("Gecko")>-1&&-1==i.indexOf("KHTML")}function isMobile(){return!!i.match(/AppleWebKit.*Mobile.*/)}function isIOS(){return!!i.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)}function isAndroid(){return i.indexOf("Android")>-1||i.indexOf("Linux")>-1}function isIPhone(){return i.indexOf("iPhone")>-1}function isIPad(){return i.indexOf("iPad")>-1}function isWebApp(){return-1==i.indexOf("Safari")}function isWeiBo(){return!!i.match(/Weibo/i)}function isWeiXin(){return!!i.match(/MicroMessenger/i)}function isUC(){return!!i.match(/UCBrowser/i)}function isQQ(){return!!i.match(/QQBrowser/i)}function isSafari(){return!!i.match(/Safari/i)}function isLizhiFM(){return null!==i.match(/LizhiFM/i)||void 0!==window.LizhiJSBridge}function wxConfig(e){var t=window.location,n=t.protocol,o=t.host,r=t.pathname,i=t.search,a=n+"//"+o+r+i;s()({"url":e,"params":{"currentURL":a}}).then(function(e){var t=e.data,n=window,o=n.wx;t&&o.config({"debug":!1,"appId":t.appid,"timestamp":t.timestamp,"nonceStr":t.nonceStr,"signature":t.signature,"jsApiList":["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","translateVoice","startRecord","stopRecord","onRecordEnd","playVoice","pauseVoice","stopVoice","uploadVoice","downloadVoice","chooseImage","previewImage","uploadImage","downloadImage","getNetworkType","openLocation","getLocation","hideOptionMenu","showOptionMenu","closeWindow","scanQRCode","chooseWXPay","openProductSpecificView","addCard","chooseCard","openCard"]})})}Object.defineProperty(t,"__esModule",{"value":!0});var o=(n(152),n(153),n(154),n(159),n(160),n(161),n(162),n(163),n(164),n(165),n(166),n(167),n(169),n(170),n(171),n(172),n(173),n(175),n(176),n(177),n(178),n(179),n(180),n(181),n(182),n(183),n(184),n(185),n(186),n(190),n(193),n(194),n(195),n(196),n(197),n(198),n(199),n(200),n(201),n(202),n(203),n(204),n(206),n(207),n(208),n(209),n(210),n(212),n(213),n(214),n(215),n(216),n(218),n(219),n(220),n(221),n(222),n(223),n(224),n(225),n(226),n(227),n(74),n(228),n(229),n(230),n(231),n(232),n(233),n(234),n(235),n(236),n(237),n(238),n(239),n(240),n(241),n(242),n(244),n(245),n(246),n(247),n(248),n(249),n(250),n(251),n(252),n(253),n(254),n(255),n(256),n(257),n(258),n(259),n(260),n(261),n(262),n(263),n(264),n(265)),r=n.n(o),i=navigator.userAgent,a=(navigator.browserLanguage||navigator.language).toLowerCase(),u={"ua":i,"lang":a,"isIE":isIE,"isOpera":isOpera,"isWebKit":isWebKit,"isFireFox":isFireFox,"isMobile":isMobile,"isIOS":isIOS,"isAndroid":isAndroid,"isIPhone":isIPhone,"isIPad":isIPad,"isWebApp":isWebApp,"isWeiBo":isWeiBo,"isWeiXin":isWeiXin,"isUC":isUC,"isQQ":isQQ,"isSafari":isSafari,"isLizhiFM":isLizhiFM},c=n(82),s=n.n(c),l=n(84),f=(n(11),n(42)),d=n(284),p=n.n(d),h=n(285),y=n.n(h),m=n(301),g=n.n(m);n(11);y.a.shim(),p.a.apikey=f["d"],p.a.releasestage="production",r.a.attach(document.body),window.lz=l["a"],window.isApp=u.isLizhiFM(),window.isWX=u.isWeiXin(),window.isWeiBo=u.isWeiBo(),window.shareData={"url":window.location.href,"link":window.location.href,"title":"全国单身踢馆歌手大赛","desc":"妈耶！单身汪怎么可以手撕情侣档？画面惨不忍睹……","image-url":g.a,"imgUrl":g.a},window.isApp&&function(e){l["a"].config({"debug":!1,"url":e,"apiList":["getToken","getSessionUser","gotoLogin","shareUrl","startRecordVoice","stopRecordVoice","uploadRecordVoice","replayRecordVoice","shareImage","saveImage"],"eventList":["user:login","recordStateChange"]})}(f["f"]),window.isWX&&(wxConfig(f["i"]),wx.ready(function(){wx.onMenuShareAppMessage(window.shareData),wx.onMenuShareTimeline(window.shareData)})),window.isWeiBo&&(window.location.href=f["h"]+"&cookie_key="+f["c"]+"wbid&redirectURL="+encodeURIComponent(window.location.href)),s.a.interceptors.response.use(function(e){return 0!==e.data.status&&p.a.notifyError(new Error(e.data.msg)),e.data},function(e){return Promise.reject(e)}),window._hmt=window._hmt||[],function(){var e=document.createElement("script");e.src="https://hm.baidu.com/hm.js?50f7f3f779102291f22b776ad51e5893";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();var b=n(1),w=n.n(b),v=n(99),S=n.n(v),A=n(312),O=n(100),x=n(326),j=n(3),C=n.n(j),P=n(11),I=function(e){function Bundle(t){P.classCallCheck(this,Bundle);var n=P.possibleConstructorReturn(this,e.call(this,t));return n.state={"mod":null},n}return P.inherits(Bundle,e),Bundle.prototype.componentWillMount=function(){this.load(this.props)},Bundle.prototype.componentWillReceiveProps=function(e){e.load!==this.props.load&&this.load(e)},Bundle.prototype.load=function(e){var t=this;this.setState({"mod":null}),e.load(function(e){t.setState({"mod":e.default?e.default:e})})},Bundle.prototype.render=function(){return this.state.mod?this.props.children(this.state.mod):null},Bundle}(b["Component"]);I.propTypes={"load":C.a.func.isRequired,"children":C.a.func.isRequired};var M,E,W=I,R=n(332),k=n.n(R),L=n(333),T=n.n(L),_=(n(11),function(e){return e.name?e:function(t){return w.a.createElement(W,{"load":e},function(e){return w.a.createElement(e,t)})}}),B=[{"path":"/","component":_(k.a),"exact":!0},{"path":"/home","component":_(k.a),"exact":!0},{"component":_(T.a)}],D=B,z=n(334),G=n.n(z),U=n(11),F=function(e){function RouteWrapper(t){return U.classCallCheck(this,RouteWrapper),U.possibleConstructorReturn(this,e.call(this,t))}return U.inherits(RouteWrapper,e),RouteWrapper.prototype.componentDidUpdate=function(){window.isWX&&wxConfig(f["i"])},RouteWrapper.prototype.render=function(){var e=this.props,t=e.location,n=e.history,o="PUSH"===n.action?"left":"right";return w.a.createElement(G.a,{"transitionName":o,"transitionEnterTimeout":1e3,"transitionLeaveTimeout":1e3},w.a.createElement("div",{"key":t.pathname,"className":"routerWrapper"},this.props.children))},RouteWrapper}(w.a.Component),V=F,Q=n(345),N=n(11),X=location.hash.length>0?x["b"]:x["a"],q=function(){return w.a.createElement(X,{"basename":f["a"]},w.a.createElement(x["c"],{"render":function(e){return w.a.createElement(V,e,w.a.createElement(x["d"],e,Object(Q["a"])(D,N.extends({},e))))}}))},K=q,H=n(145),J=n(150),$=n(89),Y=n(356),Z=n.n(Y),ee=n(11),te=new H["Cookies"],ne=(M=Object(O["b"])(function(e){return{"isLogin":Z()(e,["Global","isLogin"])}},function(e){return Object($["b"])(J["c"],e)}))(E=function(e){function App(t){return ee.classCallCheck(this,App),ee.possibleConstructorReturn(this,e.call(this,t))}return ee.inherits(App,e),App.prototype.componentDidMount=function(){this.configReady()},App.prototype.configReady=function(){var e=this;window.isApp?l["a"].ready(function(){l["a"].getSessionUser().then(function(t){t.id?(te.set(f["e"],t.id),l["a"].getToken({"needRefresh":!0}).then(function(t){"success"===t.status&&(te.set(f["g"],t.token),e.props.toggleAuthStatus(!0))})):(l["a"].on("user:login",function(){window.location.reload()}),l["a"].gotoLogin())})}):e.props.toggleAuthStatus(!0)},App.prototype.render=function(){return this.props.isLogin?w.a.createElement(K,null):null},App}(b["Component"]))||E,oe=ne,re=n(398),ie=n.n(re),ae=n(399),ue=n(11),ce={"isLogin":"object"===("undefined"==typeof exports?"undefined":ue.typeof(exports)),"errMsg":[]},se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ce,t=arguments[1];switch(t.type){case"toggleAuthStatus":return ue.extends({},e,{"isLogin":t.isLogin});case"errMsg":return ue.extends({},e,{"errMsg":[].concat(e.errMsg,[t.msg])});default:return e}},le=se,fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1];switch(t.type){case"SetDivision":return t.data;default:return e}},de=fe,pe=(n(11),{"Global":le,"Division":de}),he=n(11),ye=(Object(ae["createLogger"])(),Object($["c"])(he.extends({},pe))),me=[ie.a].concat([]),ge="object"===("undefined"==typeof window?"undefined":he.typeof(window))?window.REDUX_STATE:{},be=function(e){var t=Object($["e"])(ye,e||{},Object($["d"])($["a"].apply(void 0,me)));return t}(ge),we=(n(11),function(e){(0,S.a.render)(w.a.createElement(A["AppContainer"],null,w.a.createElement(O["a"],{"store":be},w.a.createElement(H["CookiesProvider"],null,w.a.createElement(e,null)))),document.getElementById("app"))});we(oe)},"263":function(e,t){},"264":function(e,t){},"301":function(e,t,n){e.exports=n.p+"client/assets/share_cover.jpg?ffd57bbaaa05973bc75deaad51c541d6"},"332":function(e,t,n){e.exports=function(e){n.e(0).then(function(t){e(n(400))}.bind(null,n)).catch(n.oe)}},"333":function(e,t,n){e.exports=function(e){n.e(1).then(function(t){e(n(401))}.bind(null,n)).catch(n.oe)}},"42":function(e,t,n){"use strict";n.d(t,"c",function(){return o}),n.d(t,"g",function(){return r}),n.d(t,"e",function(){return i}),n.d(t,"i",function(){return a}),n.d(t,"h",function(){return u}),n.d(t,"f",function(){return c}),n.d(t,"d",function(){return s}),n.d(t,"b",function(){return l}),n.d(t,"a",function(){return f});var o="base_cityfm_hangzhou_single_dog_",r=o+"token",i=o+"id",a="//oauthbiz.lizhi.fm/weixin/jsconfig?tag=cityfm",u="//oauthbiz.lizhi.fm/weixin/auth?tag=cityfm",c="https://h5security.lizhi.fm/jsBridgeConfig/get",s="294a8593da2207207c592dcd7364e84e913b366ca32bd592002dfc068c568f58",l=["广州","北京","成都","武汉","长沙","杭州","重庆"],f="/hangzhou/singleDog"}},[151]);
//# sourceMappingURL=app.js.map?fd56aea50fdb5867d0eb