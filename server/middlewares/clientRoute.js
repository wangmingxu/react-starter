import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@/Store';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route } from 'react-router';
import routes from '@/Route';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { collectErrMsg } from '@/Action/Global';
import { createInjector } from '@/Service';
import { COOKIE_STR_TOKEN } from 'di-sdk/package/CookieService';
import { APP_USERAGENT_TOKEN } from 'di-sdk/package/ClientDetectService';
import UseragentInterceptor from 'di-sdk/package/WithUAReqInterceptor';
import { URL_INJECT_TOKEN, LocationService } from 'di-sdk/package/LocationService';
import RelPathInterceptor from 'di-sdk/package/RelpathReqInterceptor';
import { HTTP_REQUEST_INTERCEPTORS } from 'di-sdk/package/HttpService';
import omit from 'lodash/omit';
import url from 'url';

const router = express.Router();

router.use(async (req, res) => {
  const {
    headers: { cookie },
    useragent,
    protocol,
    originalUrl,
  } = req;
  // Todo:如果有Nginx代理层,url可能会有异常
  const host = req.get('host');
  const hostname = /localhost/.test(host) ? host.replace('localhost', '127.0.0.1') : host;
  const reqUrl = `${protocol}://${hostname}${originalUrl}`;
  const Injector = createInjector([
    { provide: COOKIE_STR_TOKEN, useValue: cookie },
    { provide: APP_USERAGENT_TOKEN, useValue: useragent.source },
    { provide: URL_INJECT_TOKEN, useValue: reqUrl },
    LocationService,
    {
      provide: HTTP_REQUEST_INTERCEPTORS,
      useClass: UseragentInterceptor,
      multi: true,
    },
    {
      provide: HTTP_REQUEST_INTERCEPTORS,
      useClass: RelPathInterceptor,
      multi: true,
    },
  ]);
  const store = configureStore({ Injector });
  const currentRoute = matchRoutes(routes, originalUrl.replace(url.parse(originalUrl).search, ''));
  // console.log(currentRoute);
  // 通过组件上的getInitialProps静态方法获取数据
  const promises = currentRoute.map(
    ({ route, match }) => (route.component.getInitialProps
      ? route.component.getInitialProps(store.dispatch, match, req.query)
      : Promise.resolve(null)),
  );
  const basename = process.env.BASE_PATH || '';
  try {
    await Promise.all(promises);
    const context = {};
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.originalUrl} context={context} basename={basename}>
          <Route render={() => renderRoutes(routes)} />
        </StaticRouter>
      </Provider>,
    );
    // console.log(html);
    if (context.url) {
      res.writeHead(301, {
        Location: context.url,
      });
      res.end();
    } else {
      res.render('index', {
        root: html,
        store: serialize(omit(store.getState(), 'Injector')),
      });
    }
  } catch (error) {
    console.log(error);
    const err = error.stack || error.toString();
    store.dispatch(collectErrMsg(err)); // 同步错误信息到客户端
    res.render('index', {
      root: null,
      store: serialize(omit(store.getState(), 'Injector')),
    });
  }
});

module.exports = router;
