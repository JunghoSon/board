import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render(){
        return (
            <div className="wrp_header">
                <div className="header">
                    <h1>TEST BOARD</h1>
                    <ul className="gnb">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/board">Board</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;
