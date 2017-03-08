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
        status: '',
        error: {}
    },
    detail: {
        status: '',
        detail: {},
        error: {}
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
                    status: {$set: 'WAITING'},
                    error: {$set: {}}
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
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });
        case types.BOARD_DETAIL:
            return update(state, {
                write: {
                    status: {$set: 'WAITING'},
                    error: {$set: {}}
                }
            });
        case types.BOARD_DETAIL_SUCCESS:
            return update(state, {
                write: {
                    status: {$set: 'SUCCESS'},
                    detail: {$set: action.detail}
                }
            });
        case types.BOARD_DETAIL_FAILURE:
            return update(state, {
                write: {
                    status: {$set: 'FAILURE'},
                    error: action.error
                }
            });
        default:
            return state;
    }
}
