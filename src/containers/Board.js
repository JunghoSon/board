import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardListRequest, boardWriteRequest, boardDetailRequest } from 'actions/board';

class Board extends Component {
    constructor(props){
        super(props);
        
        this.handleList = this.handleList.bind(this);
        this.handleWrite = this.handleWrite.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
    }
    
    handleList(page){
        return this.props.boardListRequest(page);
    }
    
    handleWrite(author, title, content){
        return this.props.boardWriteRequest(author, title, content);
    }
    
    handleDetail(id){
        return this.props.boardDetailRequest(id);
    }
    
    render(){
        const { list, write, detail } = this.props;
        const onList = this.handleList;
        const onWrite = this.handleWrite;
        const onDetail = this.handleDetail;
        
        return (
            <div>
                <h2>Board</h2>
                {React.cloneElement(this.props.children, {list, write, detail, onList, onWrite, onDetail})}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.board.list,
        write: state.board.write,
        detail: state.board.detail
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        boardListRequest: (page) => {
            return dispatch(boardListRequest(page));
        },
        boardWriteRequest: (author, title, content) => {
            return dispatch(boardWriteRequest(author, title, content));
        },
        boardDetailRequest: (id) => {
            return dispatch(boardDetailRequest(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
