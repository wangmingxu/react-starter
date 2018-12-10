import rootReducer from '@/Reducer';
import { applyMiddleware, createStore } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import Injector from '../Service';

const persistConfig: PersistConfig = {
  key: 'voicereport',
  storage,
  throttle: 500,
  blacklist: ['Global', 'Injector'].concat(Injector.get('cdServ').isLizhiFM ? ['Poster'] : []),
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleware;

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-var-requires
  middleware = [thunk, require('redux-logger').createLogger()];
} else {
  middleware = [thunk];
}

const ssrState = typeof window === 'object' ? window.REDUX_STATE : {};

export const configureStore = (state = {}) => {
  // tslint:disable-next-line:no-shadowed-variable
  const store = createStore(
    persistedReducer,
    { ...state, ...ssrState },
    applyMiddleware(...middleware),
  );

  // tslint:disable-next-line:no-shadowed-variable
  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept('../Reducer', () => {
      store.replaceReducer(persistReducer(persistConfig, rootReducer));
    });
  }
  return { store, persistor };
};

export const {persistor, store} = configureStore({ Injector });