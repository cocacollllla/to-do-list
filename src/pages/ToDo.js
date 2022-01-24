import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { dbService } from '../myFirebase';
import { doneToDoData, modifyToDoData } from '../store/todo-actions';

const ToDo = ({ text, id, isDone}) => {
  const [isModify, setIsModify] = useState(false);
  const [modifyText, setModifyText] = useState(text);

  const dispatch = useDispatch();

  const modifyBtn = () => {
    setIsModify(!isModify);
  }

  const modifyDoneBtn = async (text) => {
    setIsModify(!isModify);
    dispatch(modifyToDoData(id, modifyText));
  }

  const handleChangeModifyInput = (e) => {
    setModifyText(e.target.value);
  }

  const doneToDo = () => {
    dispatch(doneToDoData(id, isDone));
  }

  const deleteToDo = async () => {
    await dbService.collection('todo').doc(id).delete();
  }

  return (
    <ToDoList>
      <label>
        <CheckBoxIcon icon={isDone ? faCheckSquare : faSquare}   />
        <CheckBoxInput type="checkbox" defaultChecked={isDone} onChange={doneToDo} />
        {isModify ? <ModifyInput type="text" defaultValue={modifyText} onChange={handleChangeModifyInput} /> : <TextBox isDone={isDone}>{modifyText}</TextBox>}
      </label>
      <BtnWrap>
        {isModify ? 
          <ModifyBtn onClick={() => modifyDoneBtn(modifyText)}><FontAwesomeIcon icon={faPencilAlt}/></ModifyBtn>
        : <ModifyBtn onClick={() => modifyBtn()}><FontAwesomeIcon icon={faPencilAlt}/></ModifyBtn>
        }
        <DeleteBtn onClick={deleteToDo}><FontAwesomeIcon icon={faTrashAlt}/></DeleteBtn>
      </BtnWrap>
    </ToDoList> 
    
  );
};


export default ToDo;

const ToDoList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const BtnWrap = styled.div`
  display: flex;
`;

const CheckBoxIcon = styled(FontAwesomeIcon)`
font-size: .9rem;
`;

const CheckBoxInput = styled.input`
  display: none;
`;


const TextBox = styled.span`
  padding-left: 15px;
  font-size: .9rem;
  font-weight: 500;
  color: ${props => props.isDone && "#c1c1c1"};
  text-decoration: ${props => props.isDone && "line-through #a1a1a1"};
`;

const DeleteBtn = styled.button`
  margin-left: 10px;
  background: transparent;
  border: none;
  font-size: .9rem;
`;

const ModifyBtn = styled.button`
  background: transparent;
  border: none;
  font-size: .9rem;
`;

const ModifyInput = styled.input`
  background: transparent;
  border: none;
  font-size: .9rem;
  font-weight: 500;
  padding-left: 15px;

  &:focus {
    outline: none;
  }
`;
