import { ComponentType, lazy, LazyExoticComponent } from 'react';
import { matchRoutes, RouteConfig } from 'react-router-config';

enum LazyComponentStatus {
    Pending  = -1,
    Resolved = 1
}

interface ILazyComponent extends LazyExoticComponent<ComponentType<any>> {
    preload: () => Promise<{
        default: ComponentType<any>;
    }>;
}

export const preloadResource = (url: string) => {
    const isPreload = checkIsPreloaded(url);
    if (isPreload) { return; }
    const link = document.createElement('link');
    link.rel = "prefetch";
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
};

const checkIsPreloaded = (url: string): boolean => {
    return !!document.querySelector(`link[href="${url}"]`);
};

export const lazyWithPreload = (factory): ILazyComponent => {
    const Component: any = lazy(factory);
    Component.preload = async () => {
        const mod = await factory();
        Component._result = mod.default; // unsafe code
        Component._status = LazyComponentStatus.Resolved; // unsafe code
        return mod;
    };
    return Component;
};

export const preloadRoute = async (pathname: string, routes: RouteConfig[]) => {
    const currentRoute = matchRoutes(routes, pathname);
    const preloadTask = currentRoute.filter(({route}) => {
        return Object.prototype.hasOwnProperty.call(route.component, 'preload');
    }).map(({route}) => {
        return (route.component as any).preload();
    });
    await Promise.all(preloadTask);
};