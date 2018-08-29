import express from 'express';
import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'Store';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, Route, Switch } from 'react-router';
import routes from 'Route';
import { matchRoutes, renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { CookiesProvider } from 'react-cookie';
import { axiosInstance } from 'utils/api';
import { initJWTInterceptor } from 'utils/jwtInterceptor';
import { checkLogin } from 'utils/auth';
import { collectErrMsg, toggleAuthStatus } from 'Action/Global';
import { UseragentProvider, ClientDetect } from 'rc-useragent';

const router = express.Router();

router.use(async (req, res) => {
  const store = req.store || configureStore();
  const { universalCookies, useragent } = req;
  const client = new ClientDetect(useragent.source);
  const isLogin = await checkLogin(client, universalCookies);
  store.dispatch(toggleAuthStatus(isLogin));
  axiosInstance.defaults.baseURL = process.env.SERVER_URL;// 兼容客户端以相对路径进行请求的情况
  const axiosRequestHook = initJWTInterceptor(axiosInstance, client, universalCookies);

  const currentRoute = matchRoutes(routes, req.originalUrl.replace(/\?((\w+)\=(\w+)\&?)+/g, ''));
  // console.log(currentRoute);

  // 通过组件上的loadData静态方法获取数据
  const promises = currentRoute.map(({ route, match }) =>
    (route.component.loadData
      ? route.component.loadData(store.dispatch, match, req.query)
      : Promise.resolve(null)));
  // console.log(promises);

  try {
    await Promise.all(promises)
      .then(() => {
        const { errMsg } = store.getState().Global;
        if (errMsg && errMsg.length > 0) {
          return Promise.reject(new Error(JSON.stringify(errMsg)));
        }
        const context = {};

        const html = ReactDOMServer.renderToString(<Provider store={store}>
          <UseragentProvider userAgent={client}>
            <CookiesProvider cookies={req.universalCookies}>
              <StaticRouter location={req.originalUrl} context={context}>
                <Route
                  render={() => (
                    <div className="routerWrapper">
                      <Switch>
                        {renderRoutes(routes)}
                      </Switch>
                    </div>
                  )}
                />
              </StaticRouter>
            </CookiesProvider>
          </UseragentProvider>
        </Provider>);
        // console.log(html);

        if (context.url) {
          res.writeHead(301, {
            Location: context.url,
          });
          return res.end();
        }
        return res.render('index', { root: html, store: serialize(store.getState()) });
      });
  } catch (error) {
    console.log(error);
    store.dispatch(collectErrMsg(error));// 同步错误信息到客户端
    res.render('index', { root: null, store: serialize(store.getState()) });
  } finally {
    axiosInstance.interceptors.request.eject(axiosRequestHook);
  }
});

module.exports = router;
