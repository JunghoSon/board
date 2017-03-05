import {
    BOARD_LIST,
    BOARD_LIST_SUCCESS,
    BOARD_LIST_FAILURE
} from 'actions/ActionTypes';
import axios from 'axios';

export function boardListRequest(page){
    return (dispatch) => {
        dispatch(boardList());

        return axios.get('/api/board/' + page)
                    .then((response) => {
                        dispatch(boardListSuccess(response.data));
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
