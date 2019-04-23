/**
 * Created by iris on 2019/4/19.
 */
import React from 'react';
import {connect} from 'react-redux';

// 无状态组件
const TodoList = (props) =>{
  //结构化赋值，inputValue=this.props.inputValue
  const {inputValue,list,changeInputValue,handleClick,handleDelete} = props;

  return (
    <div>
      <div>
        <input
          value={inputValue}
          onChange={changeInputValue}
        />
        <button onClick={handleClick}>提交</button>
      </div>

      <ul>
        {
          list.map((item, index) => {
            return <li onClick={handleDelete.bind(this, index)} key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
}


//把store里的数据，映射到组件，变成组件里的props,将store里的inputValue，赋值给props的inputValue
const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

// 将store.dispatch 方法，挂载到 props
const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      };
      dispatch(action);
    },

    handleClick(){
      const action = {
        type: 'add_item'
      };
      dispatch(action);
    },

    handleDelete(index){
      console.log(index);
      const action = {
        type: 'delete_item',
        index
      };
      dispatch(action)
    }
  }
}

// 谁和谁连接：本组件TodoList和store做连接
// 怎么做链接：规则在mapStateToProps中，把store里的数据，映射到组件，变成组件里的props

// TodoList和store关联，store的数据映射到组件的props上；想修改store，通过store的props。
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

// 实际上：todoList是一个UI组件，connect把UI组件和业务逻辑（数据、派发）结合，返回的结果为一个容器组件。
// 导出的内容就是connect的执行结果：容器组件