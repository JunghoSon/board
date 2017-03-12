import board from './board';
import member from './member';
import { combineReducers } from 'redux';

export default combineReducers({
    board,
    member
});
