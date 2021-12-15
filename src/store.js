import { createSlice, configureStore } from '@reduxjs/toolkit';

const toDoList = createSlice({
  name: 'todolist',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now(), isDone: false });
    },
    remove: (state, action) => 
      state.filter(todoId => action.payload !== todoId.id),
    done: (state, action) => 
      state.map((todo) => todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo ),
    modify: (state, action) => 
      state.map((todo) => todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo )
  }
});

export const toDoActions = toDoList.actions;

const store = configureStore({reducer: toDoList.reducer});

export default store;