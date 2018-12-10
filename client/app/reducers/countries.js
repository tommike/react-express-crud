import { RECEIVE_DATA } from '../actions/shared';

export default function tasks(state = [], action) {
  // best practice: use {} instead of [] and normalize state shape

  switch (action.type) {
    case RECEIVE_DATA:
      return action.countries;

    default:
      return state;
  }
}
