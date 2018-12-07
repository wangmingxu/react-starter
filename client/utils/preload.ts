const preload = (url: string, type: string) => {
    const isPreload = checkIsPreloaded(url);
    if (isPreload) { return }
    const link = document.createElement('link');
    link.rel = "preload";
    link.href = url
    link.as = type
    document.getElementsByTagName('head')[0].appendChild(link);
}

const checkIsPreloaded = (url: string): boolean => {
    return !!document.querySelector(`link[href="${url}"]`)
}

export default preload;