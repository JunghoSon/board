import {
    MEMBER_LOGIN,
    MEMBER_LOGIN_SUCCESS,
    MEMBER_LOGIN_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function memberLoginRequest(id, password){
    return (dispatch) => {
        dispatch(memberLogin);

        return axios.post('/member/login', { id, password })
                    .then((response) => {
                        dispatch(memberLoginSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(memberLoginFailure(error));
                    });
    };
}

export function memberLogin(){
    return {
        type: MEMBER_LOGIN
    };
}

export function memberLoginSuccess(datadma){
    return {
        type: MEMBER_LOGIN_SUCCESS,
        data: data
    };
}

export function memberLoginFailure(error){
    return {
        type: MEMBER_LOGIN_FAILURE,
        error: error
    }
}

export function memberRegisterRequest(id, password, email){
    return (dispatch) => {
        dispatch(memberRegister());
        
        return axios.post('/api/memeber/register', { id, password, email })
                    .then((response) => {
                        dispatch(memberRegisterSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(memberRegisterFailure(error));
                    });
    };
}

export function memberRegister(){
    return {
        type: MEMBER_REGISTER
    };
}

export function memberRegisterSuccess(data){
    return {
        type: MEMBER_REGISTER_SUCCESS,
        data: data
    };
}

export function memberRegisterFailure(error){
    return {
        type: MEMBER_REGISTER_FAILURE,
        error: error
    };
}
