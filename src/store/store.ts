import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { getPersistConfig } from 'redux-deep-persist'
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

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)