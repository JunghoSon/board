import React, { Component } from 'react';
import { Tbl, Pagenation } from 'components';
import { connect } from 'react-redux';
import { boardListRequest } from 'actions/board';

class List extends Component {
    componentDidMount(){
        this.props.boardListRequest(this.props.params.page);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.params.page !== nextProps.params.page){
            this.props.boardListRequest(nextProps.params.page);
        }
    }

    render(){
        return (
            <div>
                <Tbl items={this.props.listItems}/>
                <Pagenation prev={this.props.pagenation.prevPage}
                            next={this.props.pagenation.nextPage}
                            current={this.props.pagenation.current}
                            pages={this.props.pagenation.pages}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listStatus: state.board.list.status,
        listItems: state.board.list.items,
        pagenation: state.board.list.pagenation
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        boardListRequest: (page) => {
            return dispatch(boardListRequest(page));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
