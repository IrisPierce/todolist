import React from 'react';
import ReactDOM from 'react-dom';
// APP（最外层的）组件，大写字母开头都是组件
import TodoList from './TodoList';
import { Provider } from 'react-redux';
import store from './store';

// DOM返回APP组件，组件内容是一个Provider
// Provider 关联store后，将store提供给其内部的所有的组件
const App = (
  <Provider store={store}>
    <TodoList />
  </Provider>
);

ReactDOM.render(App, document.getElementById('root'));



