import {
    MEMBER_LOGIN,
    MEMBER_LOGIN_SUCCESS,
    MEMBER_LOGIN_FAILURE,
    MEMBER_CHECKID,
    MEMBER_CHECKID_SUCCESS,
    MEMBER_CHECKID_FAILURE,
    MEMBER_REGISTER,
    MEMBER_REGISTER_SUCCESS,
    MEMBER_REGISTER_FAILURE
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
                        dispatch(memberLoginFailure(error.response.data));
                    });
    };
}

export function memberLogin(){
    return {
        type: MEMBER_LOGIN
    };
}

export function memberLoginSuccess(data){
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

export function memberCheckIdRequest(id){
    return (dispatch) => {
        dispatch(memberCheckId());
        
        return axios.post('/api/member/checkId', { id })
                    .then((response) => {
                        dispatch(memberCheckIdSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(memberCheckIdFailure(error.response.data));
                    });
    };
}

export function memberCheckId(){
    return {
        type: MEMBER_CHECKID
    };
}

export function memberCheckIdSuccess(data){
    return {
        type: MEMBER_CHECKID_SUCCESS,
        data: data
    };
}

export function memberCheckIdFailure(error){
    return {
        type: MEMBER_CHECKID_FAILURE,
        error: error
    };
}

export function memberRegisterRequest(id, password, email){
    return (dispatch) => {
        dispatch(memberRegister());
        
        return axios.post('/api/member/register', { id, password, email })
                    .then((response) => {
                        dispatch(memberRegisterSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(memberRegisterFailure(error.response.data));
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
