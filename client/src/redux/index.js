import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers from "./reducers";

const middleware = [];
const store = createStore(
  combineReducers({ rootReducer: reducers }),
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
