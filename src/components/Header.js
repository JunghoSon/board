import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render(){
        return (
            <div>
                <h1>TEST BOARD</h1>
                <Link to="/">Home</Link>
                <Link to="/board">Board</Link>
            </div>
        );
    }
}

export default Header;
