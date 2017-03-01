import React, { Component } from 'react';

class Board extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(1);
    }

    render(){
        return (
            <div>
                {this.props.params.page}
            </div>
        );
    }
}

export default Board;
