import {
    MEMBER_LOGIN,
    MEMBER_LOGIN_SUCCESS,
    MEMBER_LOGIN_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function memberLoginRequest(id, password){
    return (dispatch) => {
        dispatch(memberLogin);

        axios.post('/member/login', { id, password })
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
