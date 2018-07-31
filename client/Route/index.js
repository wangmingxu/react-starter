import { createComponent } from 'Component/Bundle'; // bundle模型用来异步加载组件

import Index from 'Page/index';
import Kol from 'Page/kol';
import Ugc from 'Page/ugc';
import Record from 'Page/record';
import Poster from 'Page/poster';

const routes = [
  {
    path: '/',
    component: createComponent(Index),
    exact: true,
  },
  {
    path: '/kol',
    component: createComponent(Kol),
    exact: true,
  },
  {
    path: '/ugc',
    component: createComponent(Ugc),
    exact: true,
  },
  {
    path: '/record',
    component: createComponent(Record),
    exact: true,
  },
  {
    path: '/poster',
    component: createComponent(Poster),
    exact: true,
  },
];
export default routes;
