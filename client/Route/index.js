import { createComponent } from 'Component/Bundle'; // bundle模型用来异步加载组件

import Index from 'Page/index';
// import Voice from 'Page/Voice';
// import Post from 'Page/Post';
import Record from 'Page/Record';
// import ActivityDetail from 'Page/ActivityDetail';
// import Mine from 'Page/Mine';
// import School from 'Page/School';

const routes = [
  {
    path: '/',
    component: createComponent(Index),
    exact: true,
  },
  {
    path: '/record',
    component: createComponent(Record),
    exact: true,
  },
  // {
  //   path: '/voice/:id',
  //   component: createComponent(Voice),
  //   exact: true,
  // },
  // {
  //   path: '/post',
  //   component: createComponent(Post),
  //   exact: true,
  // },
  // {
  //   path: '/detail',
  //   component: createComponent(ActivityDetail),
  //   exact: true,
  // },
  // {
  //   path: '/mine',
  //   component: createComponent(Mine),
  //   exact: true,
  // },
  // {
  //   path: '/school/:id',
  //   component: createComponent(School),
  //   exact: true,
  // },
];
export default routes;
