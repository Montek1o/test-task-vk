import { combineReducers, configureStore } from "@reduxjs/toolkit"
import newsReducer from "../entities/News/model/slice";
import detailedNewsReducer from "../entities/DetailedNews/model/slice";
import commentsReducer from '../entities/Comment/model/slice';

const rootReducer = combineReducers({
  newsReducer,
  detailedNewsReducer,
  commentsReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];