export const stopPropagation = cb => (e) => {
  e && e.stopPropagation();
  cb();
};

export const preventDefault = cb => (e) => {
  e && e.preventDefault();
  cb();
};

export const trackClickEvent = (cb, eventName) => (e) => {
  cb && cb();
  window._hmt.push(['_trackEvent', '页面', '点击', eventName]);
}
