import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardListRequest, boardWriteRequest } from 'actions/board';

class Board extends Component {
    constructor(props){
        super(props);
        
        this.handleList = this.handleList.bind(this);
        this.handleWrite = this.handleWrite.bind(this);
    }
    
    handleList(page){
        return this.props.boardListRequest(page);
    }
    
    handleWrite(author, title, content){
        return this.props.boardWriteRequest(author, title, content);
    }
    
    render(){
        const { list, write } = this.props;
        const onList = this.handleList;
        const onWrite = this.handleWrite;
        
        return (
            <div>
                <h2>Board</h2>
                {React.cloneElement(this.props.children, {list, write, onList, onWrite})}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.board.list,
        write: state.board.write
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        boardListRequest: (page) => {
            return dispatch(boardListRequest(page));
        },
        boardWriteRequest: (author, title, content) => {
            return dispatch(boardWriteRequest(author, title, content));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
