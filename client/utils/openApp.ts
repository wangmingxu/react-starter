import { downloadUrlMap } from '@/constant';

export const getDownloadUrl = () => {
  const search = new URLSearchParams(location.search);
  const channel = search.get('channel') || '';
  if (channel in downloadUrlMap) {
    return downloadUrlMap[channel];
  }
  return 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yibasan.lizhifm&g_f=991784#opened';
};

export const showDownloadDialog = async (action) => {
  const {
    showDownloadDialog: show,
  } = await import('@lz-component/DownloadDialog');
  show({
    action,
    downloadUrl: getDownloadUrl(),
  });
};
