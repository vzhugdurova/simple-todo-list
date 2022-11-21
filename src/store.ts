import { createStore } from 'redux';
import reducer from './rootReducer';

const store = createStore(reducer);

export default store;

export type RootState = ReturnType<typeof store.getState>;
