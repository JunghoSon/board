import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    list: {
        status: '',
        items: [],
        pagenation: {},
        error: {}
    },
    write: {
        status: ''
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
                    items: {$set: action.items},
                    pagenation: {$set: action.pagenation}
                }
            });
        case types.BOARD_LIST_FAILURE:
            return update(state, {
                list: {
                    status: {$set: 'FAILURE'},
                    error: action.error
                }
            });
        case types.BOARD_WRITE:
            return update(state, {
                write: {
                    status: {$set: 'WAITING'}
                }
            });
        case types.BOARD_WRITE_SUCCESS:
            return update(state, {
                write: {
                    status: {$set: 'SUCCESS'}
                }
            });
        case types.BOARD_WRITE_FAILURE:
            return update(state, {
                write: {
                    status: {$set: 'FAILURE'}
                }
            });
        default:
            return state;
    }
}
