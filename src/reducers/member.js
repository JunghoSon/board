import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status: '',
        token: '',
        error: ''
    },
    register: {
        status: '',
        error: ''
    },
    checkId: {
        status: '',
        error: ''
    },
    checkEmail: {
        status: '',
        error: {}
    },
    checkToken: {
        status: '',
        id: '',
        email: '',
        error: {}
    },
    modify: {
        status: '',
        token:'',
        error: ''
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
                    token: {$set: action.data.token}
                }
            });
        case types.MEMBER_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error.message}
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
                    status: {$set: 'SUCCESS'}
                }
            });
        case types.MEMBER_REGISTER_FAILURE:
            return update(state, {
                register: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error.message}
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
                    status: {$set: 'SUCCESS'}
                }
            });
        case types.MEMBER_CHECKID_FAILURE:
            return update(state, {
                checkId: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error.message}
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
                    status: {$set: 'SUCCESS'}
                }
            });
        case types.MEMBER_CHECKEMAIL_FAILURE:
            return update(state, {
                checkEmail: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error.message}
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
                    id: {$set: action.data.userInfo.id},
                    email: {$set: action.data.userInfo.email}
                }
            });
        case types.MEMBER_CHECKTOKEN_FAILURE:
            return update(state, {
                checkToken: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error.message}
                }
            });
        case types.MEMBER_MODIFY:
            return update(state, {
                modify: {
                    status : {$set: 'WAITING'}
                }
            });
        case types.MEMBER_MODIFY_SUCCESS:
            return update(state, {
                modify: {
                    status: {$set: 'SUCCESS'},
                    token: {$set: action.data.token}
                }
            });
        case types.MEMBER_MODIFY_FAILURE:
            return update(state, {
                modify: {
                    status: {$set: 'FAILURE'},
                    error: {$set: action.error.message}
                }
            });
        default:
            return state;
    }
}
