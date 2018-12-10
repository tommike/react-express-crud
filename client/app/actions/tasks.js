import API from '../utils/api';

export const ADD_TASK = 'ADD_TASK';

function addTask(task) {
  return {
    type: ADD_TASK,
    task,
  };
}

export function handleAddTask(data, callback) {
  return function(dispatch) {
    return API.saveTask(data)
      .then(task => {
        dispatch(addTask(task));
        callback(true);
      })
      .catch(message => callback(false, message));
  };
}
