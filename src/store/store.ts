import { compose, legacy_createStore as createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { getPersistConfig } from 'redux-deep-persist'
import logger from "redux-logger";
import storage from 'redux-persist/lib/storage'

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = getPersistConfig({
    key: 'root',
    storage,
    blacklist: [ 'auth.clientToken', 'player' ],
    rootReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
  ].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)