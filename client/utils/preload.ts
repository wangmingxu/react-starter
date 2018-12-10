import { ComponentType, lazy, LazyExoticComponent } from 'react';

enum LazyComponentStatus {
    Pending  = -1,
    Resolved = 1
}

interface ILazyComponent extends LazyExoticComponent<ComponentType<any>> {
    preload: () => Promise<{
        default: ComponentType<any>;
    }>
}

const preload = (url: string) => {
    const isPreload = checkIsPreloaded(url);
    if (isPreload) { return }
    const link = document.createElement('link');
    link.rel = "prefetch";
    link.href = url
    document.getElementsByTagName('head')[0].appendChild(link);
}

const checkIsPreloaded = (url: string): boolean => {
    return !!document.querySelector(`link[href="${url}"]`)
}

export const lazyWithPreload = (factory): ILazyComponent => {
    const Component: any = lazy(factory);
    Component.preload = async () => {
        const mod = await factory();
        Component._result = mod.default; // unsafe code
        Component._status = LazyComponentStatus.Resolved; // unsafe code
        return mod;
    };
    return Component;
}

export default preload;