import { createComponent } from 'Component/Bundle'; // bundle模型用来异步加载组件

import Index from 'Page/index';
import Info from 'Page/Info';
import Voice from 'Page/Voice';
import Post from 'Page/Post';
import Record from 'Page/Record';
// import Mine from 'Page/Mine';

const routes = [
  {
    path: '/',
    component: createComponent(Index),
    exact: true,
  },
  {
    path: '/info',
    component: createComponent(Info),
    exact: true,
  },
  {
    path: '/record',
    component: createComponent(Record),
    exact: true,
  },
  {
    path: '/voice/:id',
    component: createComponent(Voice),
    exact: true,
  },
  {
    path: '/post',
    component: createComponent(Post),
    exact: true,
  },
  // {
  //   path: '/mine',
  //   component: createComponent(Mine),
  //   exact: true,
  // },
];
export default routes;
