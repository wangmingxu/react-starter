import 'reflect-metadata';

import AudioPlayerService from '@common-service/AudioPlayerService';
import { COOKIE_STR_TOKEN, CookieService } from '@common-service/CookieService';
// import { ClientDetectService, APP_USERAGENT_TOKEN } from '@common-service/ClientDetectService';
import {
  HTTP_ALIAS_TOKEN,
  HTTP_REQUEST_INTERCEPTORS,
  HTTP_RESPONSE_INTERCEPTORS,
  HttpService,
} from '@common-service/HttpService';
import AuthService from '@lz-service/AuthService';
import {
  APP_USERAGENT_TOKEN,
  ClientDetectService,
} from '@lz-service/ClientDetectService';
import { APP_CONFIG_TOKEN } from '@lz-service/ConfigService';
import JWTReqInterceptor from '@lz-service/JWTReqInterceptor';
import RecordService from '@lz-service/RecordService';
import ShareService from '@lz-service/ShareService';
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
  { provide: 'cdServ', useExisting: ClientDetectService },
  { provide: '$http', useExisting: HttpService },
  { provide: 'cookieServ', useExisting: CookieService },
  { provide: 'AuthServ', useExisting: AuthService },
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

const injector: ReflectiveInjector = typeof window === 'object'
  ? createInjector([
    { provide: APP_USERAGENT_TOKEN, useValue: navigator.userAgent },
    { provide: COOKIE_STR_TOKEN, useValue: document.cookie },
    { provide: JSB_SERVICE_TOKEN, useClass: JsBridgeService },
    { provide: 'jsbServ', useExisting: JSB_SERVICE_TOKEN },
    ShareService,
    { provide: 'shareServ', useExisting: ShareService },
    RecordService,
    { provide: 'recordServ', useExisting: RecordService },
    AudioPlayerService,
    { provide: 'player', useExisting: AudioPlayerService },
  ])
  : ({} as any);

export { createInjector };

export default injector;
