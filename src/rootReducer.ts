import { combineReducers } from 'redux';
import tasksReducer from './features/task/reducer';

export default combineReducers({
  tasks: tasksReducer,
});
