import React, { Component } from 'react';
import { Lnb } from 'components';

class Aside extends Component {
    render(){
        let userInfo = (
            <p className="user_info">{ this.props.userInfo !== null ? this.props.userInfo.data.info.id : '' }님 환영 합니다!!!</p>
        );
        
        return (
            <div className="aside">
                { this.props.userInfo !== null ? userInfo : undefined }
                <Lnb pageName={this.props.pageName}/>
                <div className="gdn">GDN BANNER</div>
            </div>
        );
    }
}

Aside.propTypes = {
    userInfo: React.PropTypes.object,
    pageName: React.PropTypes.string
};

Aside.defaultProps = {
    userInfo: {},
    pageName: ''
};

export default Aside;