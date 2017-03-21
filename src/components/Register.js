import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Register extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            id: '',
            password: '',
            password_confirm: '',
            email: '',
            isCheck: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckId = this.handleCheckId.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    
    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        
        if(name === 'id' && this.state.isCheck){
            this.setState({
                isCheck: false
            });
        }
        
        this.setState({
            [name]: value
        });
    }
    
    handleCheckId(){
        let id = this.state.id;
        let idRegEx = /^[a-zA-Z0-9_-]\w{5,21}$/;
        
        this.setState({
            isCheck: false
        });
        
        if(id === ''){
            alert('아이디를 입력해 주세요.');
            this.setState({
                id: this.state.id
            });
            this.idInput.focus();
            return;
        }else if(!idRegEx.test(id)){
            alert('아이디는 8자 이상 20자 이하 영문 대, 소문자, 숫자, \'_\', \'-\'만 가능합니다.');
            this.setState({
                id: ''
            });
            this.idInput.focus();
            return;
        }
        
        this.props.memberCheckIdRequest(id)
            .then(() => {
                this.setState({
                    isCheck: true
                });
            });
    }
    
    handleRegister(){
        let { id, password, password_confirm, email } = this.state;
        let idRegEx = /^[a-zA-Z0-9_-]\w{5,21}$/;
        let passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{6,21}$/;
        let emailRegEx = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
        
        if(id === ''){
            alert('아이디를 입력해 주세요.');
            this.setState({
                id: ''
            });
            this.idInput.focus();
            return;
        }else if(!idRegEx.test(id)){
            alert('아이디는 8자 이상 20자 이하 영문 대, 소문자, 숫자, \'_\', \'-\'만 가능합니다.');
            this.setState({
                id: ''
            });
            this.idInput.focus();
            return;
        }
        
        if(password === ''){
            alert('비밀번호를 입력해 주세요.');
            this.setState({
                password: ''
            });
            this.passwordInput.focus();
            return;
        }
        
        if(password_confirm === ''){
            alert('비밀번호 확인을 입력해 주세요.');
            this.setState({
                password_confirm: ''
            });
            this.passwordConfirmInput.focus();
            return;
        }
        
        if(password !== password_confirm){
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            this.setState({
                password: '',
                password_confirm: ''
            });
            this.passwordInput.focus();
            return;
        }
        
        if(!passwordRegEx.test(password)){
            alert('비밀번호 영문 대, 소문자, 숫자, 기호를 포함한 8자 이상 20자 미만 입니다.');
            this.setState({
                password: '',
                password_confirm: ''
            });
            this.passwordInput.focus();
            return;
        }
        
        if(email === ''){
            alert('이메일을 입력해 주세요');
            this.setState({
                email: ''
            });
            this.emailInput.focus();
            return;
        }else if(!emailRegEx.test(email)){
            alert('이메일 형식이 바르지 않습니다');
            this.setState({
                email: ''
            });
            this.emailInput.focus();
            return;
        }
        
        this.props.memberRegisterRequest(id, password, email)
            .then((data) => {
                if(this.props.register.status === 'SUCCESS'){
                    alert('회원가입이 성곡적으로 이루어 졌습니다.');
                    browserHistory.push('/member/login');
                }else{
                    alert(this.props.register.error.message);
                    this.setState({
                        id: '',
                        password: '',
                        password_confirm: '',
                        email: ''
                    });
                    this.idInput.focus();
                }
            });
    }
        
    render(){
        let existId = (
            <span>이미 존재하는 아이디 입니다.</span>
        );
        
        let noneExistId = (
            <span>사용 가능한 아이디 입니다.</span>
        );
        
        return (    
            <div>
                <h3>login</h3>
                <form>
                    <ul>
                        <li>
                            <input type="text" name="id" id="id" className="id" placeholder="아이디" onBlur={this.handleCheckId} title="비밀번호" value={this.state.id} onChange={this.handleChange} ref={(input) => { this.idInput = input; }}/>
                            { this.state.isCheck && this.props.checkId.status === 'FAILURE' ? existId : undefined }
                            { this.state.isCheck && this.props.checkId.status === 'SUCCESS' ? noneExistId : undefined }
                        </li>
                        <li><input type="password" name="password" id="password" className="password" placeholder="비밀번호" title="비밀번호" value={this.state.password} onChange={this.handleChange} ref={(input) => { this.passwordInput = input; }} /></li>
                        <li><input type="password" name="password_confirm" id="password_confirm" className="password_confirm" placeholder="비밀번호 확인" title="비밀번호 확인" value={this.state.password_confirm} onChange={this.handleChange} ref={(input) => { this.passwordConfirmInput = input; }} /></li>
                        <li><input type="text" name="email" id="email" className="email" placeholder="이메일" title="이메일" value={this.state.email} onChange={this.handleChange} ref={(input) => { this.emailInput = input; }} /></li>
                    </ul>
                    <a onClick={this.handleRegister}>회원가입</a>
                    <Link to="/member/login">로그인</Link>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    register: React.PropTypes.object,
    checkId: React.PropTypes.object,
    memberRegisterRequest: React.PropTypes.func,
    memberCheckIdRequest: React.PropTypes.func
};

Register.defaultProps = {
    register: {},
    checkId: {},
    memberRegisterRequest: () => {
        console.log('Register func is not defined');
    },
    memberCheckIdRequest: () => {
        console.log('CheckId func is not defined');
    }
};

export default Register;