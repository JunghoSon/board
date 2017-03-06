import {
    BOARD_LIST,
    BOARD_LIST_SUCCESS,
    BOARD_LIST_FAILURE,
    BOARD_WRITE,
    BOARD_WRITE_SUCCESS,
    BOARD_WRITE_FAILURE
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
