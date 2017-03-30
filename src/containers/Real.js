import React, { Component } from 'react';
import { Aside } from 'components';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { memberCheckTokenRequest } from 'actions/member';

class Real extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            pageName: 'real'
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
        return (
            <div>
                <h2 className="blind">Real time talk</h2>
                <div className="wrp_content">
                    <Aside pageName={this.state.pageName} userInfo={this.props.checkToken}/>
                    <div className="content">
                        <h3>Real time talk 준비중...</h3>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        checkToken: state.member.checkToken
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memberCheckTokenRequest: (token) => {
            return dispatch(memberCheckTokenRequest(token));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Real);