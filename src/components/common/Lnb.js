import React, { Component } from 'react';
import { Link } from 'react-router';

class Lnb extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return this.props.pageName !== nextProps.pageName;
    }
    
    render(){
        let real = (
            <p>real time talk lnb 준비중..</p>
        );
        
        let friends = (
            <p>friends lnb 준비중..</p>
        );
        
        let my = (
            <ul>
                <li><Link to="/my/inboxMail">Inbox Mail</Link></li>
                <li><Link to="/my/sentMail">Sent Mail</Link></li>
                <li><Link to="/my/inboxLike">Inbox Like</Link></li>
                <li><Link to="/my/sentLike">Sent Like</Link></li>
                <li><Link to="/my/editProfile">Edit Profile</Link></li>
                <li><Link to="/my/editAccount">Edit Account</Link></li>
            </ul>
        );
        
        let boards = (
            <p>boards lnb 준비중..</p>
        );
        
        return (
            <div className="lnb">
                { this.props.pageName === 'real' ? real : undefined }
                { this.props.pageName === 'friends' ? friends : undefined }
                { this.props.pageName === 'my' ? my : undefined }
                { this.props.pageName === 'boards' ? boards : undefined }
            </div>
        );
    }
}

Lnb.propTypes = {
    pageName: React.PropTypes.string
};

Lnb.defaultProps = {
    pageName: ''
};

export default Lnb;