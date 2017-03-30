import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardListRequest, boardWriteRequest, boardDetailRequest } from 'actions/board';
import { memberCheckTokenRequest } from 'actions/member';
import { Aside } from 'components';

class Board extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            pageName: 'boards'
        };
        
        this.handleList = this.handleList.bind(this);
        this.handleWrite = this.handleWrite.bind(this);
        this.handleDetail = this.handleDetail.bind(this);
    }
    
    componentWillMount(){
        let token = localStorage.getItem('tokenHeyf');

        this.checkLoggedIn(token);
    }
    
    checkLoggedIn(token){
        this.props.memberCheckTokenRequest(token)
            .then(() => {
                if(this.props.checkToken.status === 'SUCCESS'){
                    
                }
            });
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
                <h2 className="blind">Board</h2>
                <div className="wrp_content">
                    <Aside pageName={this.state.pageName} userInfo={ this.props.checkToken }/>
                    <div className="content">
                        <h3>sample list</h3>
                        {React.cloneElement(this.props.children, {list, write, detail, onList, onWrite, onDetail})}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.board.list,
        write: state.board.write,
        detail: state.board.detail,
        checkToken: state.member.checkToken
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
        },
        memberCheckTokenRequest: (token) => {
            return dispatch(memberCheckTokenRequest(token));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
