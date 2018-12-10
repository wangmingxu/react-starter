import { ComponentType, lazy, LazyExoticComponent } from 'react';

interface ILazyComponent extends LazyExoticComponent<ComponentType<any>> {
    preload?: () => Promise<{
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

export const lazyWithPreload = (factory) => {
    const Component: ILazyComponent = lazy(factory);
    Component.preload = factory;
    return Component;
}

export default preload;