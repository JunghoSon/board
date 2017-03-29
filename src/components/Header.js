import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render(){
        return (
            <div className="wrp_header">
                <div className="header">
                    <h1>TEST Hey Friends</h1>
                    <ul className="gnb">
                        <li><Link to="/real">Real Time Talk</Link></li>
                        <li><Link to="/friends">Find Friends</Link></li>
                        <li><Link to="/my">My Room</Link></li>
                        <li><Link to="/board">Boards</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;
