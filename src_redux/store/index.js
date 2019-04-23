/**
 * Created by iris on 2019/4/17.
 */

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';


//使得store既支持window下的devtools，调式stor；同时引入了Redux-thunk


//thunk中间件，REDUX_DEVTOOLS中间件，数组方式引入

//高级配置：若存在该方法，则调用，否则使得其为一个compose函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;
// 上述的变量存储一下，顺便将中间件[redux]通过applyMiddleware执行一下，传入进去
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const store = createStore(reducer, enhancer);

export default store;