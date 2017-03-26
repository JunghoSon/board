import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: '',
        data: {},
        error: {}
    },
    register: {
        status: '',
        data: {},
        error: {}
    },
    checkId: {
        status: '',
        data: {},
        error: {}
    },
    checkEmail: {
        status: '',
        data: {},
        error: {}
    },
    checkToken: {
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
        case types.MEMBER_REGISTER:
            return update(state, {
                register: {
                    status : {$set: 'WAITING'}
                }
            });
        case types.MEMBER_REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: {$set: 'SUCCESS'},
                    data: {$set: action.data}
                }
            });
        case types.MEMBER_REGISTER_FAILURE:
            return update(state, {
                register: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });
        case types.MEMBER_CHECKID:
            return update(state, {
                checkId: {
                    status : {$set: 'WAITING'}
                }
            });
        case types.MEMBER_CHECKID_SUCCESS:
            return update(state, {
                checkId: {
                    status: {$set: 'SUCCESS'},
                    data: {$set: action.data}
                }
            });
        case types.MEMBER_CHECKID_FAILURE:
            return update(state, {
                checkId: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });
        case types.MEMBER_CHECKEMAIL:
            return update(state, {
                checkEmail: {
                    status : {$set: 'WAITING'}
                }
            });
        case types.MEMBER_CHECKEMAIL_SUCCESS:
            return update(state, {
                checkEmail: {
                    status: {$set: 'SUCCESS'},
                    data: {$set: action.data}
                }
            });
        case types.MEMBER_CHECKEMAIL_FAILURE:
            return update(state, {
                checkEmail: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });
        case types.MEMBER_CHECKTOKEN:
            return update(state, {
                checkToken: {
                    status : {$set: 'WAITING'}
                }
            });
        case types.MEMBER_CHECKTOKEN_SUCCESS:
            return update(state, {
                checkToken: {
                    status: {$set: 'SUCCESS'},
                    data: {$set: action.data}
                }
            });
        case types.MEMBER_CHECKTOKEN_FAILURE:
            return update(state, {
                checkToken: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error}
                }
            });
        default:
            return state;
    }
}
