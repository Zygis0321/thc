import { createStore } from 'redux';
import reducer from './combineReducers';

export default createStore(reducer);