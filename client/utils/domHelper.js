export const stopPropagation = cb => (e) => {
  e && e.stopPropagation();
  cb();
};

export const preventDefault = cb => (e) => {
  e && e.preventDefault();
  cb();
};
