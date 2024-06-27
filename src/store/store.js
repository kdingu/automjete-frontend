import {configureStore, createListenerMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {createWrapper} from "next-redux-wrapper";
import {mainConfig} from "../configs/main-config";
import rootSaga from "./sagas/saga";
import rootReducer from "./features/reducer";

let newRootReducer = rootReducer;

//export const enableReduxPersist =
//  mainConfig.reduxPersistConfigs.enabled && mainConfig.isClientSide;
//
//if (enableReduxPersist) {
//  newRootReducer = persistReducer(
//    {
//      ...mainConfig.reduxPersistConfigs,
//      storage,
//    },
//    rootReducer
//  );
//}

const listenerMiddleware = createListenerMiddleware();

const createReduxStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: newRootReducer,
        middleware: (getDefaultMW) => getDefaultMW().prepend([listenerMiddleware.middleware, sagaMiddleware]),
        devTools: mainConfig.isDevEnv,
    });

    store.sagaTask = sagaMiddleware.run(rootSaga);

    //store.reduxPersistData = enableReduxPersist
    //  ? persistStore(store)
    //  : persistStore(store);

    return store;
};

export const reduxWrapper = createWrapper(createReduxStore, {
    debug: false,
});
