import React, { Component } from 'react';
import { UserInfo, Lnb } from 'components';

class Aside extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }
    
    render(){
        let userInfo = (
            <UserInfo userId={ this.props.userInfo.id }/>
        );
        
        return (
            <div className="aside">
                { this.props.userInfo.status === 'SUCCESS' ? userInfo : undefined }
                <Lnb pageName={this.props.pageName}/>
                <div className="gdn">GDN BANNER</div>
            </div>
        );
    }
}

Aside.propTypes = {
    userId: React.PropTypes.object,
    pageName: React.PropTypes.string
};

Aside.defaultProps = {
    userInfo: {},
    pageName: ''
};

export default Aside;