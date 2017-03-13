import React, { Component } from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';

class Member extends Component {
    constructor(props){
        super(props);
        
        this.handleLogin = this.handleLogin.bind(this);
    }
    
    handleLogin(id, password){
        return this.props.memberLoginRequest(id, pw)
                   .then(() => {
                       //
                   })
                   .catch(() => {
                       //
                   });
    }
    
    render(){
        const { login } = this.props;
        const onLogin = this.handleLogin;
        
        return (
            <div>
                <h2>Member</h2>
                {React.cloneElement(this.props.children, { login, onLogin })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.member.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memberLoginRequest: (id, password) => {
            dispatch(memberLoginRequest(id, pw));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Member);