import React, { Component } from 'react';
import { Link } from 'react-router';
import { Gnb } from 'components';

class Header extends Component {
    render(){
        return (
            <div className="wrp_header">
                <div className="header">
                    <h1><Link to="/">TEST Hey Friends</Link></h1>
                    <Gnb />
                </div>
            </div>
        );
    }
}

export default Header;
