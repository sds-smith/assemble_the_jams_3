import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'
import { persistStore, persistReducer } from "redux-persist";
import { getPersistConfig } from 'redux-deep-persist'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>

const middleWares = [logger]

const composedEnhancers = compose(applyMiddleware(...middleWares))

const persistConfig = getPersistConfig({
    key: 'root',
    storage,
    blacklist: [ 'auth.clientToken', 'player' ],
    rootReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)

