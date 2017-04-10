import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Aside } from 'components';
import { memberCheckTokenRequest, memberCheckEmailRequest, memberModifyRequest, memberProfileRequest, memberProfileModifyRequest } from 'actions/member';

class My extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            pageName: 'my'
        };
    }
    
    componentWillMount(){
        let token = localStorage.getItem('tokenHeyf');
    
        if( token !== null){
            this.checkLoggedIn(token);
        }else{
            alert('로그인 후 이용 가능한 서비스 입니다.');
            
            browserHistory.push('/member/login');
            
            this.render = () => {
                return false;
            }
        }
    }
    
    checkLoggedIn(token){
        this.props.memberCheckTokenRequest(token)
            .then(() => {
                if(this.props.checkToken.status === 'SUCCESS'){
                }else{
                    alert('세션이 종료 되었습니다. 다시 로그인 해 주세요.');
                    browserHistory.push('/member/login');
                }
            });
    }
    
    render(){
        const { checkToken, checkEmail, modify, profile, memberCheckTokenRequest, memberCheckEmailRequest, memberModifyRequest, memberProfileRequest, memberProfileModifyRequest } = this.props;
        
        return (
            <div>
                <h2 className="blind">My Room</h2>
                <div className="wrp_content">
                    <Aside pageName={this.state.pageName} userInfo={ checkToken }/>
                    <div className="content">
                        {React.cloneElement(this.props.children, { checkToken, checkEmail, modify, profile, memberCheckTokenRequest, memberCheckEmailRequest, memberModifyRequest, memberProfileRequest, memberProfileModifyRequest })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        checkToken: state.member.checkToken,
        checkEmail: state.member.checkEmail,
        modify: state.member.modify,
        profile: state.member.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memberCheckTokenRequest: (token) => {
            return dispatch(memberCheckTokenRequest(token));
        },
        memberCheckEmailRequest: (email) => {
            return dispatch(memberCheckEmailRequest(email));
        },
        memberModifyRequest: (token, password_old, password, email) => {
            return dispatch(memberModifyRequest(token, password_old, password, email));
        },
        memberProfileRequest: (token) => {
            return dispatch(memberProfileRequest(token));
        },
        memberProfileModifyRequest: (token, gender, age_y, age_m, age_d, nationality, live_nationality, live_city, lang1, lang2, lang3, job, purpose, intro) => {
            return dispatch(memberProfileModifyRequest(token, gender, age_y, age_m, age_d, nationality, live_nationality, live_city, lang1, lang2, lang3, job, purpose, intro));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(My);