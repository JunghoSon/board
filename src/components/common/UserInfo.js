import React, { Component } from 'react';

class UserInfo extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return this.props.userId !== nextProps.userId;
    }
    
    render(){
        return (
            <p className="user_info">{ this.props.userId }님 환영 합니다!!!</p>
        );
    }
}

UserInfo.propTypes = {
    userId: React.PropTypes.string
};

UserInfo.defaultProps = {
    userId: ''
};

export default UserInfo;