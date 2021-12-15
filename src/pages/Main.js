import React, {useState} from 'react';
import { toDoActions } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import ToDo from './ToDo';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  const [text, setText] = useState('');
  const [currentId, setCurrentId] = useState(1);

  const getStateList = useSelector(state => state);

  const todolist = [...getStateList]; 
  
  const dispatch = useDispatch();

  const now = new Date();	
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);

  const handleChangeNewToDo = (e) => {
    setText(e.target.value);
  }


  const handleClickNewToDo = (e) => {
    e.preventDefault();
    dispatch(toDoActions.add(text));
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


  const todolistIng = todolist.filter(list => list.isDone === false);
  const todolistDone = todolist.filter(list => list.isDone === true);


  const tabContents = {
    1 : todolist,
    2 : todolistIng,
    3 : todolistDone
  }

  const tabMenus = ['전체', '할일', '완료'];
  
  return (
    <Wrap>
      <TodolistWrap>
        <DateBox>{year}년 {month}월 {day}일</DateBox>
        <form onSubmit={handleClickNewToDo}>
          <TodoInput onChange={handleChangeNewToDo} type="text" placeholder="할일을 입력하세요." value={text} />
          <TodoBtn><FontAwesomeIcon icon={faPlus}/></TodoBtn>
        </form>

        <TabMenu>
          {tabMenus.map((menu, idx) => (
            <li key={idx} onClick={() => setCurrentId(idx + 1)} isactive={currentId === idx + 1 ? "true" : "false"}>{menu}</li>
          ))}
        </TabMenu>
       
        {tabContents[currentId].map(todo => (
          <ToDo {...todo} key={todo.id} curid={currentId}></ToDo>
        ))}
      </TodolistWrap>
    </Wrap>
  );
};

export default Main;




const Wrap = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.background};
  ${({ theme }) => theme.flexMixin('column', 'center', 'center')};
`;

const TodolistWrap = styled.div`
  width: 400px;
  height: 660px;
  padding: 50px 30px;
  background-color: ${props => props.theme.boxColor};
  border-radius:10px;
`;

const DateBox = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  padding: 0 0 20px 0;
`;

const TodoInput = styled.input`
  display: inline-block;
  width: 90%;
  height: 50px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 1.1rem;

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
  font-size: 1.1rem;
`;

const TabMenu = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 30px;

  li {
    padding: 20px 0;
    // border-bottom: 2px solid ${props => (props.isactive ? 'white' : 'black')};
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
  }
`;


