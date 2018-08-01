export function imgPreload(srcList) {
  const promiseList = srcList.map((src) => {
    let img = new Image();
    return new Promise((resolve, reject) => {
      img.onload = function () {
        img.onload = null;
        img = null;
        resolve(src);
      };
      img.onerror = reject;
      img.src = src;
      if (img.complete) {
        img.onload = null;
        resolve(src);
      }
    });
  });

  return Promise.all(promiseList);
}

export function audioPreload(src) {
  const a = new Audio();
  a.preload = 'auto';
  // window.document.body.appendChild(a)
  a.src = src;
  const audioLoadPromise = new Promise((resolve) => {
    const timer = setInterval(() => {
      if (a.readyState === 4) {
        console.log('readyState resolve');
        clearInterval(timer);
        resolve(a);
      }
    }, 50);
    // a.load && a.load();
    a.onloadedmetadata = function () {
      console.log('loadedmetadata resolve');
      resolve(a);
    };
  });
  const TimeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      console.log('timeout resolve');
      resolve(a);
    }, 3000);
  });// 设置超时时间
  return Promise.race([audioLoadPromise, TimeoutPromise]);
}

