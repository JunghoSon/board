import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
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

        this.props.memberLoginRequest(id, pw)
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
                <h2>Home</h2>
                <form>
                    <ul>
                        <li><input type="text" name="id" id="id" className="id" placeholder="아이디" title="비밀번호" value={this.state.id} onChange={this.handleChange} /></li>
                        <li><input type="password" name="password" id="password" className="password" placeholder="비밀번호" title="비밀번호" value={this.state.password} onChange={this.handleChange} /></li>
                    </ul>
                    <a onClick={this.handleClick}>로그인</a>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.member.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memberLoginRequest: (id, password) => {
            dispatch(memberLoginRequest(id, pw));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
