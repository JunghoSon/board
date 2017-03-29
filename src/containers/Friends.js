import React, { Component } from 'react';
import { Aside } from 'components';
import { connect } from 'react-redux';
import { memberCheckTokenRequest } from 'actions/member';

class Friends extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            pageName: 'friends'
        };
    }
    
    componentWillMount(){
        let token = localStorage.getItem('tokenHeyf');

        this.checkLoggedIn(token);
    }
    
    checkLoggedIn(token){
        this.props.memberCheckTokenRequest(token)
            .then(() => {
                if(this.props.checkToken.status === 'SUCCESS'){
                    
                }
            });
    }
    
    render(){
        let userInfo = (this.props.checkToken.status === 'SUCCESS') ? this.props.checkToken : null;
        
        return (
            <div>
                <h2 className="blind">Find Friends</h2>
                <div className="wrp_content">
                    <Aside pageName={this.state.pageName} userInfo={null} userInfo={ userInfo }/>
                    <div className="content">
                        <h3>Find Friends 준비중...</h3>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);