/**
 * Created by iris on 2019/4/17.
 */
import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM,INIT_LIST_ACTION } from './actionTypes'
import axios from 'axios';


export const getInputChangeAction = (value)=>({
    type:CHANGE_INPUT_VALUE,
    value
});

export const getAddItemAction = (value)=>({
    type:ADD_TODO_ITEM
});

export const getDeleteItemAction = (index)=>({
    type:DELETE_TODO_ITEM,
    index
});

export const initListAction = (data)=>({
    type:INIT_LIST_ACTION,
    data
});

export const getTodoList = () => {
    //return一个函数，在函数中执行异步ajax操作
    return (dispatch) => {
        axios.get('/list.json').then((res)=>{
            // 获取模拟调试器上的mock本地数据
            const data =res.data.list;
            // 创建ation，传入data；将action传给store
            const action = initListAction(data);
            dispatch(action);
        })
    }
}

