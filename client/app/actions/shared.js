import { getInitialData } from '../utils/api';

export const RECEIVE_DATA = 'RECEIVE_DATA';

function receiveData(tasks, countries) {
  return {
    type: RECEIVE_DATA,
    tasks,
    countries,
  };
}

export function handleInitialData() {
  return function(dispatch) {
    return getInitialData().then(({ tasks, countries }) => {
      dispatch(receiveData(tasks, countries));
    });
  };
}
