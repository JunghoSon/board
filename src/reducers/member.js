import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: '',
        data: {},
        error: {}
    }
};

export default function member(state = initialState, action){
    switch(action.type){
        case types.MEMBER_LOGIN:
            return update(state, {
                login: {
                    status : {$set: 'WAITING'}
                }
            });
        case types.MEMBER_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: {$set: 'SUCCESS'},
                    data: {$set: action.data}
                }
            });
        case types.MEMBER_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });
        default:
            return state;
    }
}
