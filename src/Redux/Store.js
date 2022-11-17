import { createStore } from 'redux';
import { addToCartReducer } from './Reducers/addToCartReducer';

export const store = createStore(addToCartReducer);