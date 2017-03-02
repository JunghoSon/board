import React, { Component } from 'react';

class ListTable extends Component {
    render(){
        let getChild = (items) => {
            return items.map((item, i) => {
                let { title, author, content, date, num } = item;
                
                return (
                    <tr>
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

ListTable.propTypes = {
    listItems: React.PropTypes.array
};

ListTable.defaultProps = {
    listItems: []
};

export default ListTable;