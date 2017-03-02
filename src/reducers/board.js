import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    list: {
        status: '',
        items: []
    }
};

export default function board(state = initialState, action){
    switch(action.type){
        case types.BOARD_LIST:
            return update(state, {
                list: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.BOARD_LIST_SUCCESS:
            return update(state, {
                list: {
                    status: {$set: 'SUCCESS'},
                    items: {$set: action.items}
                }
            });
        case types.BOARD_LIST_FAILURE:
            return update(state, {
                list: {
                    status: {$set: 'FAILURE'},
                    error: action.error
                }
            });
        default:
            return state;
    }
}