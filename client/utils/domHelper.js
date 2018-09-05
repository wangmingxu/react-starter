export const stopPropagation = cb => (e) => {
  e.stopPropagation();
  cb();
};
