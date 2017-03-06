import React, { Component } from 'react';
import { Link } from 'react-router';

class TblRow extends Component {
    render(){
        let date = new Date(this.props.date);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        
        if(month < 10) month = `0${month}`;
        if(day < 10) day = `0${day}`;
        if(hour < 10) hour = `0${hour}`;
        if(min < 10) min = `0${min}`;
        if(sec < 10) sec = `0${sec}`;
        
        let resultDate = `${year}/${month}/${day} ${hour}:${min}:${sec}`;
        
        let link = (
            <Link to={`/board/detail/${this.props.id}`}>{ this.props.title }</Link>
        );
        
        return (
            <tr>
                <td>{ this.props.num }</td>
                <td className="tit">{ link }</td>
                <td>{ this.props.author }</td>
                <td>{ resultDate }</td>
            </tr>
        );
    }
}

TblRow.propTypes = {
    title: React.PropTypes.string,
    author: React.PropTypes.string,
    date: React.PropTypes.string,
    num: React.PropTypes.number,
    id: React.PropTypes.string,
    index: React.PropTypes.number
};

TblRow.defaultProps = {
    title: '',
    author: '',
    date: '',
    num: 0,
    id: '',
    index: 0
};

export default TblRow;
