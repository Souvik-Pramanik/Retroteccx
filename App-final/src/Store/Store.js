import {createStore} from 'redux';
import rootReducer from '../Reducer/RootReducer';

export const Store = createStore(rootReducer);