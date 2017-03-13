import React, { Component } from 'react';
import { Header } from 'components';

class Member extends Component {
    render(){
        return (
            <div>
                <h2>Member</h2>
                {this.props.children}
            </div>
        );
    }
}

export default Member;