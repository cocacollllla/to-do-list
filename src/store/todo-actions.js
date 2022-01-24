import { dbService } from "../myFirebase";
import { todoActions } from "./todoSlice";

export const sendAddData = (day, text) => { 
  return async (dispatch) => {
    dispatch(todoActions.add({
      date: day,
      text: text
    }));

    await dbService.collection("todo").add({ 
      isDone: false, 
      date: day, 
      text
    });
 
  }
};


export const doneToDoData = (id, isDone) => { 
  return async (dispatch) => {
    dispatch(todoActions.done(id));

    await dbService.collection('todo').doc(id).update({
      isDone : !isDone
    });

  }
};


export const modifyToDoData = (id, text) => { 
  return async (dispatch) => {
    dispatch(todoActions.modify(id, text));

    await dbService.collection('todo').doc(id).update({
      text
    });
  }
};
