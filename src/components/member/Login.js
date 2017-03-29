import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    handleClick(){
        let id = this.state.id;
        let password = this.state.password;
        
        if(id === ''){
            this.idInput.focus();
            return;
        }
        
        if(password === ''){
            this.passwordInput.focus();
            return;
        }

        this.props.memberLoginRequest(id, password)
            .then(() => {
                //토큰 처리
                if(this.props.login.status === 'SUCCESS'){
                    localStorage.setItem('tokenHeyf', this.props.login.data.token);
                    
                    if(browserHistory.getCurrentLocation().pathname.indexOf('login') > 0){
                        browserHistory.push('/');
                    }
                }else{
                    alert(this.props.login.error.message);
                    browserHistory.push('/member/login');
                }
            });
    }

    render(){
        return (
            <div className={this.props.pageName === 'member' ? 'wrp_member' : undefined}>
                <form>
                    <div className="frm_login">
                        <h3 className="border_none">login</h3>
                        <ul>
                            <li><input type="text" name="id" id="id" className="id" placeholder="아이디" title="비밀번호" value={this.state.id} onChange={this.handleChange} ref={(input) => { this.idInput = input; }} /></li>
                            <li><input type="password" name="password" id="password" className="password" placeholder="비밀번호" title="비밀번호" value={this.state.password} onChange={this.handleChange} ref={(input) => { this.passwordInput = input; }} /></li>
                        </ul>
                        <a onClick={this.handleClick} className="btnS btn_login">로그인</a>
                    </div>
                    <a className="btnS">아이디&middot;비밀번호 찾기</a>
                    <Link to="/member/register" className="btnS btn_acc">회원가입</Link>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    pageName: React.PropTypes.string,
    login: React.PropTypes.object,
    memberLoginRequest: React.PropTypes.func
};

Login.defaultProps = {
    pageName: 'member',
    login: {},
    memberLoginRequest: () => {
        console.log('Login func is not defined');
    }
};

export default Login;
