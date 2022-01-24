import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todolist',
  initialState: [],
  reducers: {
    replaceData: (state, action) => 
      state = [...action.payload]
    ,
    add: (state, action) => {
      state.push({ text: action.payload.text, date: action.payload.pleaseDate, isDone: false });
    },
    remove: (state, action) => 
      state.filter(todoId => action.payload !== todoId.id),
    done: (state, action) => 
      state.map((todo) => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo ),
    modify: (state, action) => 
      state.map((todo) => todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo )
  }
});

export const todoActions = todoSlice.actions;

export default todoSlice;

