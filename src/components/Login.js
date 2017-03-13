import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
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
        let pw = this.state.pw;

        this.props.onLogin(id, pw)
            .then(() => {
                //토큰 처리
            })
            .catch(() => {
                //에러 처리
            });
    }
    
    render(){
        return (
            <div>
                <h3>login</h3>
                <form>
                    <ul>
                        <li><input type="text" name="id" id="id" className="id" placeholder="아이디" title="비밀번호" value={this.state.id} onChange={this.handleChange} /></li>
                        <li><input type="password" name="password" id="password" className="password" placeholder="비밀번호" title="비밀번호" value={this.state.password} onChange={this.handleChange} /></li>
                    </ul>
                    <a onClick={this.handleClick}>로그인</a>
                    <Link to="/member/register">회원가입</Link>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    onLogin: React.PropTypes.func
};

Login.defaultProps = {
    onLogin: () => {
        console.log('Login func is not defined');
    }
};

export default Login;