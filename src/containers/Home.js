import React, { Component } from 'react';
import { Login } from 'components';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
    memberLoginRequest,
    memberCheckTokenRequest
 } from 'actions/member';

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            isCheck: false,
            isLogin: false
        };
    }

    componentDidMount(){
        let token = localStorage.getItem('tokenHeyf');

        if( token !== null){
            //token 유효성 체크
            this.checkLoggedIn(token);
        }else{
            this.setState({
                isCheck: true
            });
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.login.data.token !== nextProps.login.data.token){
            this.checkLoggedIn(nextProps.login.data.token);
        }
    }

    checkLoggedIn(token){
        this.props.memberCheckTokenRequest(token)
            .then(() => {
                if(this.props.checkToken.status === 'SUCCESS'){
                    this.setState({
                        isCheck: true,
                        isLogin: true
                    });
                }else{
                    this.setState({
                        isCheck: true,
                        isLogin: false
                    });
                }
            });
    }

    render(){
        let loginForm = (
            <Login login={ this.props.login } memberLoginRequest={ this.props.memberLoginRequest } />
        );

        let userInfo = (
            <p>{ this.props.checkToken.status === 'SUCCESS' ? this.props.checkToken.data.info.id : '' }님 환영 합니다!!!</p>
        );

        return (
            <div>
                <h2>Home</h2>
                <div>
                    { this.state.isCheck && this.state.isLogin ? userInfo : loginForm }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.member.login,
        checkToken: state.member.checkToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memberLoginRequest: (id, password) => {
            return dispatch(memberLoginRequest(id, password));
        },
        memberCheckTokenRequest: (token) => {
            return dispatch(memberCheckTokenRequest(token));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
