import 'reflect-metadata';

import AuthService from '@lizhife/lz-market-service/package/AuthService';
import {
  APP_USERAGENT_TOKEN,
  ClientDetectService,
} from '@lizhife/lz-market-service/package/ClientDetectService';
import { APP_CONFIG_TOKEN } from '@lizhife/lz-market-service/package/ConfigService';
import JWTReqInterceptor from '@lizhife/lz-market-service/package/JWTReqInterceptor';
import RecordService from '@lizhife/lz-market-service/package/RecordService';
import ShareService from '@lizhife/lz-market-service/package/ShareService';
import { COOKIE_STR_TOKEN, CookieService } from 'di-sdk/package/CookieService';
// import { ClientDetectService, APP_USERAGENT_TOKEN } from 'di-sdk/package/ClientDetectService';
import {
  HTTP_ALIAS_TOKEN,
  HTTP_REQUEST_INTERCEPTORS,
  HTTP_RESPONSE_INTERCEPTORS,
  HttpService,
} from 'di-sdk/package/HttpService';
import { Provider, ReflectiveInjector } from 'injection-js';
import config from './config';
import DefaultResInterceptor from './DefaultResInterceptor';
import httpAlias from './http-alias';
import JsBridgeService, { JSB_SERVICE_TOKEN } from './JsBridgeService';

const defaultProvider: Provider[] = [
  ClientDetectService,
  HttpService,
  CookieService,
  AuthService,
  RecordService,
  { provide: 'cdServ', useExisting: ClientDetectService },
  { provide: '$http', useExisting: HttpService },
  { provide: 'cookieServ', useExisting: CookieService },
  { provide: 'AuthServ', useExisting: AuthService },
  { provide: 'recordServ', useExisting: RecordService },
  { provide: APP_CONFIG_TOKEN, useValue: config },
  {
    provide: HTTP_RESPONSE_INTERCEPTORS,
    useClass: DefaultResInterceptor,
    multi: true,
  },
  {
    provide: HTTP_REQUEST_INTERCEPTORS,
    useClass: JWTReqInterceptor,
    multi: true,
  },
  {
    provide: HTTP_ALIAS_TOKEN,
    useValue: httpAlias,
  },
];

const createInjector = (provider: Provider[]) => {
  const factory = ReflectiveInjector.resolveAndCreate([...defaultProvider, ...provider]);
  return factory;
};

const injector = typeof window === 'object'
  ? createInjector([
    { provide: APP_USERAGENT_TOKEN, useValue: navigator.userAgent },
    { provide: COOKIE_STR_TOKEN, useValue: document.cookie },
    {provide: JSB_SERVICE_TOKEN, useClass: JsBridgeService},
    { provide: 'jsbServ', useExisting: JSB_SERVICE_TOKEN },
    ShareService,
    { provide: 'shareServ', useExisting: ShareService },
  ])
  : null;

export { createInjector };

export default injector;
