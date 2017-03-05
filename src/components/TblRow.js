import React, { Component } from 'react';

class TblRow extends Component {
    render(){
        return (
            <tr>
                <td>{ this.props.num }</td>
                <td className="tit">{ this.props.title }</td>
                <td>{ this.props.author }</td>
                <td>{ this.props.date }</td>
            </tr>
        );
    }
}

TblRow.propTypes = {
    title: React.PropTypes.string,
    author: React.PropTypes.string,
    content: React.PropTypes.string,
    date: React.PropTypes.string,
    num: React.PropTypes.number
};

TblRow.defaultProps = {
    title: '',
    author: '',
    content: '',
    date: '',
    number: 0
};

export default TblRow;
