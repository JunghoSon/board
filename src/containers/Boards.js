import React, { Component } from 'react';

class Boards extends Component {
    render(){
        return (
            <div>
                <h2>Boards</h2>
                {this.props.children}
            </div>
        );
    }
}

export default Boards;
