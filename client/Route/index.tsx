import { lazy } from 'react';

// 如果需要执行前后端通用的应用级初始化启动逻辑(比如登录状态检查)
// 可以在routes建一个根节点Root,
// 在Root上定义getInitialProps静态方法来执行
const routes = [
  {
    path: '/',
    component: __ISOMORPHIC__
      ? require('Page/index').default
      : lazy(() => import('Page/index')),
    exact: true,
  },
  {
    path: '/record',
    component: __ISOMORPHIC__
      ? require('Page/record').default
      : lazy(() => import('Page/record')),
    exact: true,
  },
  {
    path: '/loading/:id',
    component: __ISOMORPHIC__
      ? require('Page/loading').default
      : lazy(() => import('Page/loading')),
    exact: true,
  },
];
export default routes;
