declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

declare var __ISOMORPHIC__: Boolean;
declare var PUBLIC_URL: string;

declare var process: NodeJS.Process;

declare var fundebug: any;

interface Window{
    _hmt: any;
    REDUX_STATE: any;
}