import { createComponent } from 'Component/Bundle'; // bundle模型用来异步加载组件

import Index from 'Page/index';
import Kol from 'Page/kol';

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
];
export default routes;
