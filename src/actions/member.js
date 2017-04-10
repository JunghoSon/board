import {
    MEMBER_LOGIN,
    MEMBER_LOGIN_SUCCESS,
    MEMBER_LOGIN_FAILURE,
    MEMBER_CHECKID,
    MEMBER_CHECKID_SUCCESS,
    MEMBER_CHECKID_FAILURE,
    MEMBER_CHECKEMAIL,
    MEMBER_CHECKEMAIL_SUCCESS,
    MEMBER_CHECKEMAIL_FAILURE,
    MEMBER_REGISTER,
    MEMBER_REGISTER_SUCCESS,
    MEMBER_REGISTER_FAILURE,
    MEMBER_CHECKTOKEN,
    MEMBER_CHECKTOKEN_SUCCESS,
    MEMBER_CHECKTOKEN_FAILURE,
    MEMBER_MODIFY,
    MEMBER_MODIFY_SUCCESS,
    MEMBER_MODIFY_FAILURE,
    MEMBER_PROFILE,
    MEMBER_PROFILE_SUCCESS,
    MEMBER_PROFILE_FAILURE,
    MEMBER_PROFILE_MODIFY,
    MEMBER_PROFILE_MODIFY_SUCCESS,
    MEMBER_PROFILE_MODIFY_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function memberLoginRequest(id, password){
    return (dispatch) => {
        dispatch(memberLogin);

        return axios.post('/api/member/login', { id, password })
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

export function memberCheckEmailRequest(email){
    return (dispatch) => {
        dispatch(memberCheckEmail());

        return axios.post('/api/member/checkEmail', { email })
                    .then((response) => {
                        dispatch(memberCheckEmailSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(memberCheckEmailFailure(error.response.data));
                    });
    };
}

export function memberCheckEmail(){
    return {
        type: MEMBER_CHECKEMAIL
    };
}

export function memberCheckEmailSuccess(data){
    return {
        type: MEMBER_CHECKEMAIL_SUCCESS,
        data: data
    };
}

export function memberCheckEmailFailure(error){
    return {
        type: MEMBER_CHECKEMAIL_FAILURE,
        error: error
    };
}

export function memberCheckTokenRequest(token){
    return (dispatch) => {
        dispatch(memberCheckToken());

        let instance = axios.create();
        instance.defaults.headers.common['x-access-token'] = token;

        return instance.get('/api/member/checkToken')
                    .then((response) => {
                        dispatch(memberCheckTokenSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(memberCheckTokenFailure(error.response.data));
                    });
    };
}

export function memberCheckToken(){
    return {
        type: MEMBER_CHECKTOKEN
    };
}

export function memberCheckTokenSuccess(data){
    return {
        type: MEMBER_CHECKTOKEN_SUCCESS,
        data: data
    };
}

export function memberCheckTokenFailure(error){
    return {
        type: MEMBER_CHECKTOKEN_FAILURE,
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

export function memberModifyRequest(token, password_old, password, email){
    return (dispatch) => {
        dispatch(memberRegister());
        
        let instance = axios.create();
        instance.defaults.headers.common['x-access-token'] = token;
        
        return instance.post('/api/member/modify', { password_old, password, email })
                    .then((response) => {
                        dispatch(memberModifySuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(memberModifyFailure(error.response.data));
                    });
    };
}

export function memberModify(){
    return {
        type: MEMBER_MODIFY
    };
}

export function memberModifySuccess(data){
    return {
        type: MEMBER_MODIFY_SUCCESS,
        data: data
    };
}

export function memberModifyFailure(error){
    return {
        type: MEMBER_MODIFY_FAILURE,
        error: error
    };
}

export function memberProfileRequest(token){
    return (dispatch) => {
        dispatch(memberProfile());
        
        let instance = axios.create();
        instance.defaults.headers.common['x-access-token'] = token;
        
        return instance.get('/api/member/profile')
                    .then((response) => {
                        dispatch(memberProfileSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(memberProfileFailure(error.response.data));
                    });
    };
}

export function memberProfile(){
    return {
        type: MEMBER_PROFILE
    };
}

export function memberProfileSuccess(data){
    return {
        type: MEMBER_PROFILE_SUCCESS,
        data: data
    };
}

export function memberProfileFailure(error){
    return {
        type: MEMBER_PROFILE_FAILURE,
        error: error
    };
}

export function memberProfileModifyRequest(token, gender, age_y, age_m, age_d, nationality, live_nationality, live_city, lang1, lang2, lang3, job, purpose, intro){
    return (dispatch) => {
        dispatch(memberProfileModify());
        
        let instance = axios.create();
        instance.defaults.headers.common['x-access-token'] = token;
        
        return instance.post('/api/member/profile', { gender, age_y, age_m, age_d, nationality, live_nationality, live_city, lang1, lang2, lang3, job, purpose, intro })
                    .then((response) => {
                        dispatch(memberProfileModifySuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(memberProfileModifyFailure(error.response.data));
                    });
    };
}

export function memberProfileModify(){
    return {
        type: MEMBER_PROFILE_MODIFY
    };
}

export function memberProfileModifySuccess(data){
    return {
        type: MEMBER_PROFILE_MODIFY_SUCCESS,
        data: data
    };
}

export function memberProfileModifyFailure(error){
    return {
        type: MEMBER_PROFILE_MODIFY_FAILURE,
        error: error
    };
}
