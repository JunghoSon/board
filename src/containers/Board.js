import React, { Component } from 'react';

class Board extends Component {
    render(){
        return (
            <div>
                <h2>Board</h2>
                {this.props.children}
            </div>
        );
    }
}

export default Board;
