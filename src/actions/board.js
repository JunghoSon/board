import {
    BOARD_LIST,
    BOARD_LIST_SUCCESS,
    BOARD_LIST_FAILURE
} from 'actions/ActionTypes';
import axios from 'axios';

export function boardListRequest(page){
    return (dispatch) => {
        dispatch(boardList());
        
        console.log(page);
        
        return axios.get('/api/board/' + page)
                    .then((response) => {
                        console.log(response);
                        dispatch(boardListSuccess(response.data.boards));
                    })
                    .catch((error) => {
                        dispatch(boardListFailure(error));
                    });
    };
}

export function boardList(){
    return {
        type: BOARD_LIST
    };
}

export function boardListSuccess(list){
    return {
        type: BOARD_LIST_SUCCESS,
        items: list
    };
}

export function boardListFailure(error){
    return {
        type: BOARD_LIST_FAILURE,
        error: error
    };
}