import React, {useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { toDoActions } from '../store';
import { useDispatch } from 'react-redux';

const ToDo = ({ text, id, isDone }) => {
  const [isModify, setIsModify] = useState(false);
  const [modifyText, setModifyText] = useState(text);

  const dispatch = useDispatch();

  const modifyBtn = () => {
    setIsModify(!isModify);
  }

  const modifyDoneBtn = (text) => {
    setIsModify(!isModify);
    dispatch(toDoActions.modify({text, id}));
  }

  const handleChangeModifyInput = (e) => {
    setModifyText(e.target.value);
  }

  const doneToDo = () => {
    dispatch(toDoActions.done(id));
  }

  const deleteToDo = () => {
    console.log('zz');
    dispatch(toDoActions.remove(id));
  }


  return (
 
    <ToDoList>
      <label>
        <CheckBoxIcon icon={isDone ? faCheckSquare : faSquare}   />
        <CheckBoxInput type="checkbox" defaultChecked={isDone} onChange={doneToDo} />
        {isModify ? <ModifyInput type="text" defaultValue={modifyText} onChange={handleChangeModifyInput} /> : <TextBox>{modifyText}</TextBox>}
      </label>
      {isModify ? 
        <ModifyBtn onClick={() => modifyDoneBtn(modifyText)}><FontAwesomeIcon icon={faPencilAlt}/></ModifyBtn>
      : <ModifyBtn onClick={() => modifyBtn()}><FontAwesomeIcon icon={faPencilAlt}/></ModifyBtn>}
      
      <DeleteBtn onClick={deleteToDo}><FontAwesomeIcon icon={faTrashAlt}/></DeleteBtn>
    </ToDoList> 
    
  );
};


export default ToDo;

const ToDoList = styled.div`
  margin-bottom: 18px;
`;

const CheckBoxIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.mainColor};
  font-size: 1.4rem;
`;

const CheckBoxInput = styled.input`
  display: none;
`;


const TextBox = styled.span`
  padding-left: 15px;
  font-weight: 500;
  font-size: 1.2rem;
`;

const DeleteBtn = styled.button`
  width: 10%;
  background: transparent;
  border: none;
  font-size: 1.1rem;
  color: ${props => props.theme.mainColor};
`;

const ModifyBtn = styled.button`
  width: 10%;
  background: transparent;
  border: none;
  font-size: 1.1rem;
  color: ${props => props.theme.mainColor};
`;

const ModifyInput = styled.input`
  width: 70%;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: 500;
  padding-left: 15px;

  &:focus {
    outline: none;
  }
`;
