import {
  configureStore,
  DeepPartial,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import rootReducer, { rootSaga } from "store/modules";
import createSagaMiddleware from "redux-saga";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import Redux from "redux";
import logger from "redux-logger";
import { SET_LOG_GUIDE } from "store/modules/log/saga";
import { LOGOUT } from "store/modules/user/saga";
import { SET_ACCOUNT, SET_CUSTOMER } from "store/modules/manage/saga";
import { enhancer } from "addon-redux";

const sagaMiddleware = createSagaMiddleware();

const initStore = (preloadedState?: DeepPartial<RootState>) => {
  const middleware = [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          SET_LOG_GUIDE,
          LOGOUT,
          SET_ACCOUNT,
          SET_CUSTOMER,
        ],
      },
    }),
    sagaMiddleware,
  ] as Redux.Middleware[];

  if (process.env.REACT_APP_USE_REDUX_LOGGER === "true") {
    middleware.push(logger);
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.REACT_APP_USE_REDUX_DEVTOOL === "true",
    enhancers: [enhancer],
  });

  // hmr enable
  if (process.env.REACT_APP_USE_REDUX_DEVTOOL === "true" && module.hot) {
    module.hot.accept("store/modules", () => {
      const nextRootReducer = require("store/modules");
      store.replaceReducer(nextRootReducer);
    });
  }

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof initStore>["store"]["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const { store, persistor } = initStore();
export { store, persistor };
