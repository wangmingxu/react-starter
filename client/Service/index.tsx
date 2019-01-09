import { COOKIE_STR_TOKEN, CookieService } from '@common-service/CookieService';
// import { ClientDetectService, APP_USERAGENT_TOKEN } from '@common-service/ClientDetectService';
import {
  HTTP_REQUEST_INTERCEPTORS,
  HTTP_RESPONSE_INTERCEPTORS,
  HttpService,
} from '@common-service/HttpService';
import AuthService from '@lz-service/AuthService';
import { APP_USERAGENT_TOKEN, ClientDetectService } from '@lz-service/ClientDetectService';
import { APP_CONFIG_TOKEN } from '@lz-service/ConfigService';
import DefaultResInterceptor from '@lz-service/DefaultResInterceptor';
import JsBridgeService, { JSB_SERVICE_TOKEN } from '@lz-service/JsBridgeService';
import JWTReqInterceptor from '@lz-service/JWTReqInterceptor';
import ShareService from '@lz-service/ShareService';
import { Provider, ReflectiveInjector } from 'injection-js';
import config from './config';

const defaultProvider: Provider[] = [
  ClientDetectService,
  HttpService,
  CookieService,
  AuthService,
  { provide: 'cdServ', useExisting: ClientDetectService },
  { provide: '$http', useExisting: HttpService },
  { provide: 'cookieServ', useExisting: CookieService },
  { provide: 'authServ', useExisting: AuthService },
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
];

const createInjector = (provider: Provider[]) => {
  const factory = ReflectiveInjector.resolveAndCreate([...defaultProvider, ...provider]);
  return factory;
};

const injector: ReflectiveInjector = typeof window === 'object'
  ? createInjector([
    { provide: APP_USERAGENT_TOKEN, useValue: navigator.userAgent },
    { provide: COOKIE_STR_TOKEN, useValue: document.cookie },
    { provide: JSB_SERVICE_TOKEN, useClass: JsBridgeService },
    { provide: 'jsbServ', useExisting: JSB_SERVICE_TOKEN },
    ShareService,
    { provide: 'shareServ', useExisting: ShareService },
  ])
  : ({} as any);

export { createInjector };

export default injector;
