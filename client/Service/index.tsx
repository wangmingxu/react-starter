import { APP_USERAGENT_TOKEN, ClientDetectService } from '@common-service/ClientDetectService';
import { COOKIE_STR_TOKEN, CookieService } from '@common-service/CookieService';
import {
  // HTTP_REQUEST_INTERCEPTORS,
  // HTTP_RESPONSE_INTERCEPTORS,
  HttpService,
} from '@common-service/HttpService';
import { Provider, ReflectiveInjector } from 'injection-js';

export const CommonService: Provider[] = [
  HttpService,
  CookieService,
  { provide: 'cdServ', useExisting: ClientDetectService },
  { provide: 'http', useExisting: HttpService },
  { provide: 'cookieServ', useExisting: CookieService },
];

export const ClientService = typeof window === 'object' ? [
  { provide: APP_USERAGENT_TOKEN, useValue: navigator.userAgent },
  { provide: COOKIE_STR_TOKEN, useValue: document.cookie },
] : null;

const injector: ReflectiveInjector = typeof window === 'object'
  ? ReflectiveInjector.resolveAndCreate([...CommonService, ...ClientService])
  : ({} as any);

export default injector;
