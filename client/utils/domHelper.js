export const stopPropagation = cb => (e) => {
  e && e.stopPropagation();
  cb();
};
