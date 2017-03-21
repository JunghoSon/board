import React, { Component } from 'react';
import { Header } from 'components';
import { connect } from 'react-redux';
import { 
    memberLoginRequest,
    memberRegisterRequest,
    memberCheckIdRequest
} from 'actions/member';
    
class Member extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        const { login, register, checkId, memberLoginRequest, memberRegisterRequest, memberCheckIdRequest } = this.props;
        
        return (
            <div>
                <h2>Member</h2>
                {React.cloneElement(this.props.children, { login, register, checkId, memberLoginRequest, memberRegisterRequest, memberCheckIdRequest })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.member.login,
        register: state.member.register,
        checkId: state.member.checkId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memberLoginRequest: (id, password) => {
            return dispatch(memberLoginRequest(id, password));
        },
        memberRegisterRequest: (id, password, email) => {
            return dispatch(memberRegisterRequest(id, password, email));
        },
        memberCheckIdRequest: (id) => {
            return dispatch(memberCheckIdRequest(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Member);