import React from 'react';
import ReactDOM from 'react-dom';
// APP（最外层的）组件，大写字母开头都是组件
import TodoList from './TodoList';


ReactDOM.render(<TodoList />, document.getElementById('root'));

// ReactDOM.render(<TodoList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

