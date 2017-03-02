import React, { Component } from 'react';
import ListTable from 'components';
import { connect } from 'react-redux';
import { boardListRequest } from 'actions/board';

class List extends Component {
    componentDidMount(){
        this.props.boardListRequest(this.props.params.page)
            .then(() => {
                console.log(this.props.listItems);
            });
    }

    render(){
        let getChild = (items) => {
            return items.map((item, i) => {
                let { title, author, content, date, num } = item;
                
                return (
                    <tr key={i}>
                        <td>{ num }</td>
                        <td>{ title }</td>
                        <td>{ author }</td>
                        <td>{ date }</td>
                    </tr>
                );
            });
        };
        
        return (
                <table>
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">제목</th>
                            <th scope="col">작성자</th>
                            <th scope="col">작성일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getChild(this.props.listItems)}
                    </tbody>
                </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listStatus: state.board.list.status,
        listItems: state.board.list.items
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
