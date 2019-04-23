/**
 * Created by iris on 2019/4/15.
 * 单个任务组件
 *
 * 子组件向父组件传值：子组件要调用父组件传递过来的方法
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // 避免一个组件做无谓的render操作
    // 利用shouldComponentUpdate提升性能：若更新后的content和更新前的content一致，则不刷新渲染
    shouldComponentUpdate(nextProps,nextState){
        //nextProps指更新后Props会变成什么样，nextState指的是State会变化成什么样
        if(nextProps.content !== this.props.content){
            return true;
        }else{
            return false;
        }
    }

    render() {
        const {content} = this.props; //ES6 结构赋值
        return (
            <div onClick={this.handleClick}>
                {content}
            </div>
        );
    }

    handleClick() {
        const {deleteItem, index} = this.props;
        deleteItem(index);
    }
}

// 组件要接受外部传过来的值，进行类型校验。验证传值
TodoItem.propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    deleteItem: PropTypes.func,
    index: PropTypes.number
}


export default TodoItem;

