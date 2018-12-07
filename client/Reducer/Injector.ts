import { ReflectiveInjector } from 'injection-js';

const initState = ({} as ReflectiveInjector);

const Injector = (state = initState) => state;

export default Injector;
