// import { lazy } from 'react';
import { lazyWithPreload } from '@/utils/preload';
import { RouteConfig } from 'react-router-config';

export const indexPage = lazyWithPreload(() => import('@/Page/index'));
export const RecordPage = lazyWithPreload(() => import('@/Page/Record'));

// 如果需要执行前后端通用的应用级初始化启动逻辑(比如登录状态检查)
// 可以在routes建一个根节点Root,
// 在Root上定义getInitialProps静态方法来执行
const routes: RouteConfig[] = [
  {
    path: '/',
    component: __ISOMORPHIC__
      ? require('@/Page/index').default
      : indexPage,
    exact: true,
  },
  {
    path: '/record',
    component: __ISOMORPHIC__
      ? require('@/Page/Record').default
      : RecordPage,
    exact: true,
  },
  {
    path: '/loading/:id',
    component: __ISOMORPHIC__
      ? require('@/Page/Loading').default
      : lazyWithPreload(() => import('@/Page/Loading')),
    exact: true,
  },
  {
    path: '/result/:id',
    component: __ISOMORPHIC__
      ? require('@/Page/Result').default
      : lazyWithPreload(() => import('@/Page/Result')),
    exact: true,
  },
  {
    path: '/voice/:id',
    component: __ISOMORPHIC__
      ? require('@/Page/Voice').default
      : lazyWithPreload(() => import('@/Page/Voice')),
    exact: true,
  },
];
export default routes;
