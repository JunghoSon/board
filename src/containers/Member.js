import React, { Component } from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { 
    memberLoginRequest,
    memberRegisterRequest
} from 'actions/member';
    
class Member extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const { login, register, memberLoginRequest, memberRegisterRequest } = this.props;
        
        return (
            <div>
                <h2>Member</h2>
                {React.cloneElement(this.props.children, { login, register, memberLoginRequest, memberRegisterRequest })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.member.login,
        register: state.member.register
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memberLoginRequest: (id, password) => {
            return dispatch(memberLoginRequest(id, password));
        },
        memberRegisterRequest: (id, password, email) => {
            return dispatch(memberRegisterRequest(id, password, email));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Member);