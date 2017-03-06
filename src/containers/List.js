import React, { Component } from 'react';
import { Tbl, Pagenation } from 'components';
import { connect } from 'react-redux';
import { boardListRequest } from 'actions/board';
import { Link } from 'react-router';

class List extends Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        this.props.boardListRequest(this.props.params.page);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.params.page !== nextProps.params.page){
            this.props.boardListRequest(nextProps.params.page);
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
        let update = JSON.stringify(this.props.listItems) !== JSON.stringify(nextProps.listItems);
        return update;    
    }

    render(){
        return (
            <div>
                <h3>리스트</h3>
                <Tbl items={this.props.listItems}/>
                <p className="wrp_btn_r"><Link to="/board/write" className="btn">글쓰기</Link></p>
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
