import { combineReducers } from 'redux';
import dataLoading from './data-loading';
import tasks from './tasks';
import countries from './countries';

export default combineReducers({
  tasks,
  countries,
  dataLoading,
});
