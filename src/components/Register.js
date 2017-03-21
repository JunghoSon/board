import React, { Component } from 'react';

class Register extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            id: '',
            password: '',
            password_confirm: '',
            email: ''
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
        let { id, password, password_confirm, email } = this.state;
        
        if(id === ''){
            alert('아이디를 입력해 주세요.');
            return;
        }
        
        if(password === ''){
            alert('비밀번호를 입력해 주세요.');
            return;
        }
        
        if(password_confirm === ''){
            alert('비밀번호 확인을 입력해 주세요.');
            return;
        }
        
        if(password !== password_confirm){
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }
        
        if(email === ''){
            alert('이메일을 입력해 주세요');
        }
        
        this.props.memberRegisterRequest(id, password, email)
            .then(() => {
                //
            })
            .catch(() => {
                
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
                        <li><input type="password" name="password_confirm" id="password_confirm" className="password_confirm" placeholder="비밀번호 확인" title="비밀번호 확인" value={this.state.password_confirm} onChange={this.handleChange} /></li>
                        <li><input type="text" name="email" id="email" className="email" placeholder="이메일" title="이메일" value={this.state.email} onChange={this.handleChange} /></li>
                    </ul>
                    <a onClick={this.handleClick}>회원가입</a>
                    <Link to="/member/login">로그인</Link>
                </form>
            </div>
        );
    }
}

Register.propTypes = {
    register: React.PropTypes.object,
    memberRegisterRequest: React.PropTypes.func
};

Register.defaultProps = {
    register: {},
    memberRegisterRequest: () => {
        console.log('Register func is not defined');
    }
};

export default Register;