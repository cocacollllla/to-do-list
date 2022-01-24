import React, {useEffect, useState} from 'react';
import { todoActions } from '../store/todoSlice';
import { useSelector, useDispatch } from 'react-redux';
import ToDo from './ToDo';
import { BsPlus } from "react-icons/bs";
import styled from 'styled-components';
import Calendar from './Calendar';
import moment from 'moment';
import { dbService } from '../myFirebase';
import { sendAddData } from '../store/todo-actions';

const Main = () => {
  const [text, setText] = useState('');
  const [value, setValue] = useState(moment());


  const returnToday = () => setValue(moment());
  const handleClickDay = (day) => setValue(day);
  const jumpToMonth = (num) => (num ? setValue(value.clone().add(1, 'month')) : setValue(value.clone().subtract(1, 'month')));
  

  const getStateList = useSelector(state => state);
  const todolist = [...getStateList]; 
  
  const dispatch = useDispatch();

  const day = value.format('YYYYMMDD');

  useEffect(() => {
    dbService.collection('todo').where('date', "==", day).onSnapshot((querySnapshot) => {
      const getProduct = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
      dispatch(todoActions.replaceData(getProduct));
    });
  }, [day, dispatch]);


  const handleChangeNewToDo = (e) => {
    setText(e.target.value);
  }


  const handleClickNewToDo = (e) => {
    e.preventDefault();
    dispatch(sendAddData(day, text));
    setText('');
  }



  todolist.sort((a,b) => {
    if(a.isDone === b.isDone){
      return 0
    } else {
      if(a.isDone) {
        return 1
      } else {
        return -1
      }
    }
  });

  return (
    <Wrap>
      <Calendar returnToday={returnToday} jumpToMonth={jumpToMonth} handleClickDay={handleClickDay} value={value} todolist={todolist} />
      <TodolistWrap>
        <DateBox>{value.format(`YYYY년 MM월 DD일`)}</DateBox>
        <form onSubmit={handleClickNewToDo}>
          <TodoInput onChange={handleChangeNewToDo} type="text" placeholder="할일을 입력하세요." value={text} />
          <TodoBtn><BsPlus /></TodoBtn>
        </form>
       
       <TodoWrap>
          {todolist.map(todo => (
            <ToDo {...todo} todolist={todolist} key={todo.id}></ToDo>
          ))}
        </TodoWrap>
      </TodolistWrap>
    </Wrap>
  );
};

export default Main;




const Wrap = styled.div`
  height: 100vh;
  background-color: #f1f1f1;
`;

const TodolistWrap = styled.div`
  max-width: 360px;
  height: auto;
  padding: 30px 30px 50px 30px;
  margin: 0 auto;
  border-radius:10px;
`;

const TodoWrap = styled.div`
  margin-top: 30px;
`;

const DateBox = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0 0 20px 0;
`;

const TodoInput = styled.input`
  display: inline-block;
  width: 90%;
  height: 50px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: .9rem;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${props => props.theme.placeholderColor};
  }
  :-ms-input-placeholder {
     color: ${props => props.theme.placeholderColor};;
  }

  &:focus {
    outline: none;
  }
`;


const TodoBtn = styled.button`
  width: 10%;
  background: transparent;
  border: none;
  font-size: .9rem;
`;


