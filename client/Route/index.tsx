import index from '@/Page/index';
import Loading from '@/Page/Loading';
import Record from '@/Page/Record';
import Result from '@/Page/Result';
import Voice from '@/Page/Voice';
import { lazyWithPreload } from '@/utils/preload';
import { RouteConfig } from 'react-router-config';

const createComponent = (Component) => (
  (Component.displayName || Component.name)
    ? Component
    : lazyWithPreload(() => (new Promise(resolve => Component(resolve))))
)

// 如果需要执行前后端通用的应用级初始化启动逻辑(比如登录状态检查)
// 可以在routes建一个根节点Root,
// 在Root上定义getInitialProps静态方法来执行
const routes: RouteConfig[] = [
  {
    path: '/',
    component: createComponent(index),
    exact: true,
  },
  {
    path: '/record',
    component: createComponent(Record),
    exact: true,
  },
  {
    path: '/loading/:id',
    component: createComponent(Loading),
    exact: true,
  },
  {
    path: '/result/:id',
    component: createComponent(Result),
    exact: true,
  },
  {
    path: '/voice/:id',
    component: createComponent(Voice),
    exact: true,
  },
];

export default routes;
