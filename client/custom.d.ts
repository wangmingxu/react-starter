declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.less';
declare module '*.css';

declare var __ISOMORPHIC__: boolean;
declare var PUBLIC_URL: string;

declare var process: NodeJS.Process;

declare var fundebug: any;

// tslint:disable-next-line:interface-name
interface Window {
    _hmt: any;
}