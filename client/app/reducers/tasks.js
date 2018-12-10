import { ADD_TASK } from '../actions/tasks';
import { RECEIVE_DATA } from '../actions/shared';

export default function tasks(state = [], action) {
  // best practice: use {} instead of [] and normalize state shape
  switch (action.type) {
    case ADD_TASK:
      return state.concat([action.task]);

    case RECEIVE_DATA:
      return action.tasks;

    default:
      return state;
  }
}
