/**
 * Created by iris on 2019/4/19.
 */
import  { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

export default store;