import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';

import axios from 'axios';

import './style.css';

// 定义一个React组件：App是一个类，继承Component类
class TodoList extends Component {

    // Todolist组件的构造函数，组件创造的瞬间，自动执行。
    constructor(props) {
        super(props);
        // 创建了state数据项：数据存放的位置
        this.state = {
            list: [],
            inputValue: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }

    // 约定：ajax放在componentDidMount中
    // ajax只需要请求1次
    componentDidMount(){
        axios.get('/api/todolist')
        // axios.get('http://localhost.charlesproxy...:3000')
            .then((res)=>{
            this.setSate(()=>({
                list: [...res.data]
                })
            );
        })
            .catch(()=>{alert('错误')})
    }

    // 当组件的state或者props发生改变的时候，render函数就会重新执行
    // 必须需要的函数，负责组件显示的内容：return的内容为需要显示的内容。
    render() {
        // 返回一个大组件:1.一个div 2.React.Fragment
        return (
            <Fragment>
                <div>
                    <label htmlFor="insertArea">输入内容</label>
                    {/* 外层{}表示为JS表达式；里面的{}表达式为JS的对象*/}
                    <input
                        id="insertArea"
                        className='input'
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <button
                        className='red-btn'
                        onClick={this.handleBtnClick}>add
                    </button>
                </div>

                <ul>
                    {this.getTodoItem()}
                </ul>

            </Fragment>
        );
    }


    // 1 添加任务
    // 1.1输入框改变，保存输入框内容
    handleInputChange(e) {
        // setState性能优化的方式：函数的形式变为异步的setState
        const value = e.target.value;
        this.setState(() => ({
            inputValue: value
        }));
    }

    // 1.2点击add，增加一项数据
    handleBtnClick() {
        // 按下按钮，调用setState来改变数据list：...展开运算符，表示老的内容 + 增加的新的内容
        // 新方法：
        // prevState:修改数据之前的那一次数据的状态；避免不小心改变state状态
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }));
    }


    // 二、通信 子组件向父组件传值：子组件调用该方法的时候，将需要删除的index传入父组件的方法。
    handleItemDelete(index) {
        // 拷贝、删除、复制
        this.setState((prevState) => {
            const list = [...prevState.list];
            list.splice(index, 1);
            return {list} //ES6的新写法，键值一致的写法
        });

    }

    // 三、代码优化
    getTodoItem() {
        return (
            // 循环list中的数据，每循环一次，返回一个类标签
            this.state.list.map((item, index) => {
                // 类标签需要唯一key值：key={index} ，否则会报错（但是可以运行）
                // 列表渲染的时候，渲染的不是类标签，而是一个组件，content的参数形式将item传入
                return (
                    <TodoItem
                        key={index}
                        deleteItem={this.handleItemDelete}
                        content={item}
                        index={index}
                    />
                );
            })
        );
    }
}
// 导出出去，index.js才可以引入
export default TodoList;
