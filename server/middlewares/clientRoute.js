const express = require('express');

import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../../client/Store';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route } from 'react-router';
import routes from '../../client/Route';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';
import get from 'lodash/get';

const router = express.Router();

router.use((req, res) => {
  const currentRoute = matchRoutes(routes, req.originalUrl);
  // console.log(currentRoute);

  const store = req.store || configureStore();

  // 通过组件上的loadData静态方法获取数据
  const promises = currentRoute.map(({ route, match }) =>
    (route.component.loadData
      ? route.component.loadData(store.dispatch, match)
      : Promise.resolve(null)));
  // console.log(promises);

  Promise
    .all(promises)
    .then(() => {
      const errMsg = get(store.getState(), 'Global', 'errMsg');
      if (errMsg && errMsg.length > 0) {
        return Promise.reject(new Error(JSON.stringify(errMsg)));
      }
      const context = {};

      const html = ReactDOMServer.renderToString(<Provider store={store}>
        <CookiesProvider cookies={req.universalCookies}>
          <StaticRouter location={req.originalUrl} context={context}>
            <Route
              render={() => (
                <span>
                  <div className="routerWrapper">{renderRoutes(routes)}</div>
                </span>
              )}
            />
          </StaticRouter>
        </CookiesProvider>
      </Provider>);
      // console.log(html);

      if (context.url) {
        res.writeHead(301, {
          Location: context.url,
        });
        return res.end();
      }
      return res.render('index', { root: html, store: serialize(store.getState()) });
    })
    .catch((error) => {
      console.log(error);
      res.render('index', { root: null, store: serialize(store.getState()) });
    })
    .finally(() => {
      axios.interceptors.request.eject(req.axiosRequestHook);
      axios.interceptors.response.eject(req.axiosResponseHook);
    });
});

module.exports = router;
