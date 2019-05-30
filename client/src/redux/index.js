import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers';

// @TODO: Import your reducers

const middleware = [];
const store = createStore(
  combineReducers({rootReducer: reducers}),
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;


// import { composeWithDevTools } from 'redux-devtools-extension';
// import { createStore, combineReducers, applyMiddleware } from 'redux';

// // @TODO: Import your reducers
// import ShareItemPreviewReducer from './ShareItemPreview/reducer';

// const middleware = [];

// const store = createStore(
//  combineReducers({
//    shareItemPreview: ShareItemPreviewReducer
//  }),
//  composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;