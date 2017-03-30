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
            checkStatusId: 0,
            checkStatusPassword: 0,
            checkStatusPasswordConfirm: 0,
            checkStatusEmail: 0
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckId = this.handleCheckId.bind(this);
        this.handleCheckPassword = this.handleCheckPassword.bind(this);
        this.handleCheckPasswordConfirm = this.handleCheckPasswordConfirm.bind(this);
        this.handleCheckEmail = this.handleCheckEmail.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    
    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        
        this.setState({
            [name]: value
        });
    }
    
    handleCheckId(){
        let id = this.state.id;
        let idRegEx = /^[a-zA-Z0-9_-]\w{4,19}$/;
        
        if(id === ''){
            this.setState({
                checkStatusId: 1
            });
            return Promise.resolve(false);
        }else if(!idRegEx.test(id)){
            this.setState({
                checkStatusId: 2
            });
            return Promise.resolve(false);
        }
        
        return this.props.memberCheckIdRequest(id)
                   .then(() => {
                       let status = (this.props.checkId.status === 'SUCCESS') ? 4 : 3;
                        
                       this.setState({
                           checkStatusId: status
                       });
                       return Promise.resolve(false);
                    });
    }
    
    handleCheckPassword(){
        let password = this.state.password;
        let passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{5,15}$/;
        let status = 0;
        
        if(password === ''){
            status = 1;
        }else if(!passwordRegEx.test(password)){
            status = 5;
        }
        
        this.setState({
            checkStatusPassword: status
        });
        return Promise.resolve(false);
    }
    
    handleCheckPasswordConfirm(){
        let { password, password_confirm } = this.state;
        let passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{5,15}$/;
        let status = 0;
        
        if(password_confirm === ''){
            status = 1;
        }else if(!passwordRegEx.test(password)){
            status = 5;
        }else if(password !== password_confirm){
            status = 6;
            this.setState({
                password_confirm: ''
            });
        }
        
        this.setState({
            checkStatusPasswordConfirm: status
        });
        return Promise.resolve(false);
    }
    
    handleCheckEmail(){
        let email = this.state.email;
        let emailRegEx = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        
        if(email === ''){
            this.setState({
                checkStatusEmail: 1
            });
            return Promise.resolve(false);
        }else if(!emailRegEx.test(email)){
            this.setState({
                checkStatusEmail: 8
            });
            return Promise.resolve(false);
        }
        
        return this.props.memberCheckEmailRequest(email)
                   .then(() => {
                       let status = (this.props.checkEmail.status === 'SUCCESS') ? 9 : 7;
                        
                       this.setState({
                           checkStatusEmail: status
                       });
                       return Promise.resolve(false);
                    });
    }
    
    handleRegister(){
        let { id, password, password_confirm, email } = this.state;
        
        this.handleCheckId()
            .then(this.handleCheckPassword)
            .then(this.handleCheckPasswordConfirm)
            .then(this.handleCheckEmail)
            .then(() => {
                if(this.state.checkStatusId === 4  && this.state.checkStatusPassword === 0 && this.state.checkStatusPasswordConfirm === 0 && this.state.checkStatusEmail === 9){
                    this.props.memberRegisterRequest(id, password, email)
                        .then((data) => {
                            if(this.props.register.status === 'SUCCESS'){
                                alert('회원가입이 성곡적으로 이루어 졌습니다.');
                                browserHistory.push('/member/login');
                            }
                        });
                }
            });
        
    }
    
    handleBack(){
        browserHistory.goBack();
    }
        
    render(){
        const notice = [
            '',
            '필수 정보입니다.',
            '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
            '이미 사용중인 아이디 입니다.',
            '사용 가능한 아이디 입니다.',
            '6~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.',
            '비밀번호가 일치하지 않습니다.',
            '이미 사용중인 이메일 입니다.',
            '이메일 형식이 바르지 않습니다.',
            '사용 가능한 이메일 입니다.'
        ];
        
        return (    
            <div>
                <h3 className="border_none">회원가입</h3>
                <form>
                    <ul className="frm_register">
                        <li>
                            <input type="text" name="id" className="id" placeholder="아이디" title="비밀번호" 
                                   value={this.state.id} 
                                   onChange={this.handleChange} 
                                   onBlur={this.handleCheckId} />
                            <span className={ this.state.checkStatusId === 4 ? 'fcg' : 'fcr' }>{ notice[this.state.checkStatusId] }</span>
                        </li>
                        <li>
                            <input type="password" name="password" className="password" placeholder="비밀번호" title="비밀번호" 
                                   value={this.state.password} 
                                   onChange={this.handleChange} 
                                   onBlur={this.handleCheckPassword} />
                            <span className="fcr">{ notice[this.state.checkStatusPassword] }</span>
                        </li>
                        <li>
                            <input type="password" name="password_confirm" className="password_confirm" placeholder="비밀번호 확인" title="비밀번호 확인" 
                                   value={this.state.password_confirm} 
                                   onChange={this.handleChange} 
                                   onBlur={this.handleCheckPasswordConfirm} 
                                   ref={(input) => {this.passwordConfirmInput = input}}/>
                            <span className="fcr">{ notice[this.state.checkStatusPasswordConfirm] }</span>
                        </li>
                        <li>
                            <input type="text" name="email" className="email" placeholder="이메일" title="이메일" 
                                   value={this.state.email} 
                                   onChange={this.handleChange} 
                                   onBlur={this.handleCheckEmail} />
                            <span className={ this.state.checkStatusEmail === 9 ? 'fcg' : 'fcr' }>{ notice[this.state.checkStatusEmail] }</span>
                        </li>
                    </ul>
                    <a onClick={this.handleRegister} className="btnS">회원가입</a>
                    <a onClick={this.handleBack} className="btnS btn_cancel">취소</a>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    register: React.PropTypes.object,
    checkId: React.PropTypes.object,
    checkEmail: React.PropTypes.object,
    memberRegisterRequest: React.PropTypes.func,
    memberCheckIdRequest: React.PropTypes.func
};

Register.defaultProps = {
    register: {},
    checkId: {},
    checkEmail: {},
    memberRegisterRequest: () => {},
    memberCheckIdRequest: () => {},
    memberCheckEmailRequest: () => {}
};

export default Register;