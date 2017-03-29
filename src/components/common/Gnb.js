import React, { Component } from 'react';
import { Link } from 'react-router';

class Gnb extends Component {
    render(){
        return (
            <ul className="gnb">
                <li><Link to="/real">Real Time Talk</Link></li>
                <li><Link to="/friends">Find Friends</Link></li>
                <li><Link to="/my">My Room</Link></li>
                <li><Link to="/board">Boards</Link></li>
            </ul>
        );
    }
}

export default Gnb;
