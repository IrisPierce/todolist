/**
 * Created by iris on 2019/4/17.
 */
import React, {Component} from 'react';

import 'antd/dist/antd.css'

import store from './store';
import { getInputChangeAction, getAddItemAction,getDeleteItemAction,getTodoList } from './store/actionCreators'

import TodoListUI from './TodoListUI'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// 设置模拟调试器实例
const mock = new MockAdapter(axios);
mock.onGet('/list.json').reply(200, {
    list:["iris","jay","gd"]
});

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.hanleStoreChange = this.hanleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        // 组件去订阅store
        store.subscribe(this.hanleStoreChange);
    }

    render() {
        return <TodoListUI
            inputValue={this.state.inputValue}
            list={this.state.list}
            handleInputChange={this.handleInputChange}
            handleBtnClick={this.handleBtnClick}
            handleItemDelete={this.handleItemDelete}
        />

    }

    componentDidMount(){
        const action = getTodoList();
        // console.log(action);
        store.dispatch(action);
    }

    handleInputChange(e) {
        const action=getInputChangeAction(e.target.value);
        store.dispatch(action);
    }

    handleBtnClick(){
        const action=getAddItemAction();
        store.dispatch(action);

    }

    handleItemDelete(index){
        const action=getDeleteItemAction(index);
        store.dispatch(action);

    }

    //store同步：感知到变化的时候，调用store.getState()重新取数据，再用setState替换当前
    hanleStoreChange(){
        this.setState(store.getState());
    }


}

export default TodoList