//打开模态框前调用
export function fixedBody() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;width:100%;';
}

//关闭模态框后调用
export function looseBody() {
    var body = document.body;
    body.style.position = 'static';
    var top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    body.style.top = '';
}