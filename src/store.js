import {createStore} from 'redux';

const reducer = (state = [], action) => {
  switch(action.type){
    case 'add':
      return [{text: action.text, id:Date.now(), isDone: false}, ...state];
    case 'del':
      return state.filter(todoId => action.id !== todoId.id);
    case 'done': 
      return state.map((todo) => todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo );
    case 'modify': 
      return state.map((todo) => todo.id === action.id ? { ...todo, text: action.text } : todo );
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;