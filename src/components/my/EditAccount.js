import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class EditAccount extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            id: '',
            password_old: '',
            password: '',
            password_confirm: '',
            email: '',
            checkStatusPasswordOld: 0,
            checkStatusPassword: 0,
            checkStatusPasswordConfirm: 0,
            checkStatusEmail: 0
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckPasswordOld = this.handleCheckPasswordOld.bind(this);
        this.handleCheckPassword = this.handleCheckPassword.bind(this);
        this.handleCheckPasswordConfirm = this.handleCheckPasswordConfirm.bind(this);
        this.handleCheckEmail = this.handleCheckEmail.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    
    componentDidMount(){
        this.setState({
            id: this.props.checkToken.data.info.id,
            email: this.props.checkToken.data.info.email
        });
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props.checkToken.status !== nextProps.checkToken.status){
            this.setState({
                id: nextProps.checkToken.data.info.id,
                email: nextProps.checkToken.data.info.email
            });
        }
    }
    
    checkLoggedIn(token){
        this.props.memberCheckTokenRequest(token)
            .then(() => {
                if(this.props.checkToken.status === 'SUCCESS'){
                    this.setState({
                        id: this.props.checkToken.data.info.id,
                        email: this.props.checkToken.data.info.email
                    });
                }else{
                    alert('세션이 종료 되었습니다. 다시 로그인 해 주세요.');
                    browserHistory.push('/member/login');
                }
            });
    }
    
    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        
        this.setState({
            [name]: value
        });
    }
    
    handleCheckPasswordOld(){
        let password_old = this.state.password_old;
        let status = 0;
        
        if(password_old === ''){
            status = 1;
        }
        
        this.setState({
            checkStatusPasswordOld: status
        });
        return Promise.resolve(false);
    }
    
    handleCheckPassword(){
        let password = this.state.password;
        let password_old = this.state.password_old;
        let passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{5,15}$/;
        let status = 0;
        
        if(password === ''){
            status = 1;
        }else if(password === password_old){
            status = 10;
            this.setState({
                password: ''
            });
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
    
    handleModify(){
        let { id, password_old, password, email } = this.state;
        console.log(email);
        
        this.handleCheckPasswordOld()
            .then(this.handleCheckPassword)
            .then(this.handleCheckPasswordConfirm)
            .then(this.handleCheckEmail)
            .then(() => {
                if(this.state.checkStatusPasswordOld === 0 && this.state.checkStatusPassword === 0 && this.state.checkStatusPasswordConfirm === 0 && this.state.checkStatusEmail === 9){
                    this.props.memberModifyRequest(id, password_old, password, email)
                        .then((data) => {
                            if(this.props.modify.status === 'SUCCESS'){
                                alert('회원정보 수정이 성공적으로 이루어 졌습니다.');
                                localStorage.setItem('tokenHeyf', this.props.modify.data.token);
                                this.setState({
                                    password_old: '',
                                    password: '',
                                    password_confirm: ''
                                });
                                this.checkLoggedIn(this.props.modify.data.token);
                                //browserHistory.push('/member/login');
                            }else{
                                //에러처리 필요
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
            '사용 가능한 이메일 입니다.',
            '기존 비밀번호와 동일한 비밀 번호 입니다.'
        ];
        let userId = (this.props.checkToken.status === 'SUCCESS') ? this.props.checkToken.data.info.id : undefined;
        
        return (
            <div>
                <h3>Edit Account</h3>
                <div>
                    <form>
                        <fieldset>
                            <legend>회원정보 수정</legend>
                            <ul className="frm_modify">
                                <li>{ userId }</li>
                                <li>
                                    <input type="password" name="password_old" placeholder="기존 비밀번호" title="기존 비밀번호" 
                                           value={this.state.password_old} 
                                           onChange={this.handleChange} 
                                           onBlur={this.handleCheckPasswordOld} />
                                    <span className="fcr">{ notice[this.state.checkStatusPasswordOld] }</span>
                                </li>
                                <li>
                                    <input type="password" name="password" placeholder="비밀번호" title="비밀번호" 
                                           value={this.state.password} 
                                           onChange={this.handleChange} 
                                           onBlur={this.handleCheckPassword} />
                                    <span className="fcr">{ notice[this.state.checkStatusPassword] }</span>
                                </li>
                                <li>
                                    <input type="password" name="password_confirm" placeholder="비밀번호 확인" title="비밀번호 확인" 
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
                            <a onClick={this.handleModify} className="btnS">회원가입</a>
                            <a onClick={this.handleBack} className="btnS btn_cancel">취소</a>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

EditAccount.propTypes = {
    checkToken: React.PropTypes.object,
    modify: React.PropTypes.object,
    checkEmail: React.PropTypes.object,
    memberCheckTokenRequest: React.PropTypes.func,
    memberCheckEmailRequest: React.PropTypes.func,
    memberModifyRequest: React.PropTypes.func
};

EditAccount.defaultProps = {
    checkToken: {},
    checkEmail: {},
    modify: {},
    memberCheckTokenRequest: () => {},
    memberCheckEmailRequest: () => {},
    memberModifyRequest: () => {}
}

export default EditAccount;