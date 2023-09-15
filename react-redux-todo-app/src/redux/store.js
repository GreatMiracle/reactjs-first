import rootReducer from './reducer';
// import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';

const composeEnhancers = composeWithDevTools();
const store = createStore(rootReducer, composeEnhancers);
// const store = configureStore({
//     reducer: rootReducer,
//   });

export default store;
