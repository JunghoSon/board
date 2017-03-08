import {
    BOARD_LIST,
    BOARD_LIST_SUCCESS,
    BOARD_LIST_FAILURE,
    BOARD_WRITE,
    BOARD_WRITE_SUCCESS,
    BOARD_WRITE_FAILURE,
    BOARD_DETAIL,
    BOARD_DETAIL_SUCCESS,
    BOARD_DETAIL_FAILURE
} from 'actions/ActionTypes';
import axios from 'axios';

export function boardListRequest(page){
    return (dispatch) => {
        dispatch(boardList());

        return axios.get('/api/board/list/' + page)
                    .then((response) => {
                        dispatch(boardListSuccess(response.data));
                    })
                    .catch((error) => {
                        dispatch(boardListFailure(error.response.data));
                    });
    };
}

export function boardList(){
    return {
        type: BOARD_LIST
    };
}

export function boardListSuccess(data){
    return {
        type: BOARD_LIST_SUCCESS,
        items: data.boards,
        pagenation: data.pagenation
    };
}

export function boardListFailure(error){
    return {
        type: BOARD_LIST_FAILURE,
        error: error
    };
}

export function boardWriteRequest(author, title, content){
    return (dispatch) => {
        dispatch(boardWrite());
        
        return axios.post('/api/board/write', { author, title, content })
                    .then((response) => {
                         dispatch(boardWriteSuccess());
                     })
                     .catch((error) => {
                         dispatch(boardWriteFailure(error));
                     });
    };
}

export function boardWrite(){
    return {
        type: BOARD_WRITE
    };
}

export function boardWriteSuccess(){
    return {
        type: BOARD_WRITE_SUCCESS
    };
}

export function boardWriteFailure(error){
    return {
        type: BOARD_WRITE_FAILURE,
        error: error
    };
}

export function boardDetailRequest(id){
    return (dispatch) => {
        dispatch(boardDetail());
        
        return axios.get('/api/board/detail/' + id)
                    .then((response) => {
                        dispatch(boardDetailSuccess(response.data.detail));
                    })
                    .catch((error) => {
                        dispatch(error);
                    });
    };
}

export function boardDetail(){
    return {
        type: BOARD_DETAIL
    };
}

export function boardDetailSuccess(detail){
    return {
        type: BOARD_DETAIL_SUCCESS,
        detail: detail
    };
}

export function boardDetailFailure(error){
    return {
        type: BOARD_DETAIL,
        error: error
    };
}
