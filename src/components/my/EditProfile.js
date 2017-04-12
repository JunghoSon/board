import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class EditProfile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            gender: 'male',
            age_y: '',
            age_m: '',
            age_d: '',
            live_nationality: '',
            live_city: '',
            lang1: '',
            lang2: '',
            lang3: '', 
            job: '',
            purpose: '',
            intro: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleModify = this.handleModify.bind(this);
    }
    
    componentWillMount(){
        let token = localStorage.getItem('tokenHeyf');
        
        if( token !== null){
            //token 유효성 체크
            this.getProfile(token);
        }else{
            alert('로그인 후 이용 가능한 서비스 입니다.');
            browserHistory.push('/member/login');
            this.render = () => {
                return false;
            }
        }
    }
    
    getProfile(token){
        this.props.memberProfileRequest(token)
            .then(() => {
                if(this.props.profile.status === 'SUCCESS'){
                    this.setState({
                        gender: this.props.profile.gender,
                        age_y: this.props.profile.age_y,
                        age_m: this.props.profile.age_m,
                        age_d: this.props.profile.age_d,
                        nationality: this.props.profile.nationality,
                        live_nationality: this.props.profile.live_nationality,
                        live_city: this.props.profile.live_city,
                        lang1: this.props.profile.lang1,
                        lang2: this.props.profile.lang2,
                        lang3: this.props.profile.lang3, 
                        job: this.props.profile.job,
                        purpose: this.props.profile.purpose,
                        intro: this.props.profile.intro
                    });
                }else{
                    //유효하지 않은 토큰
                }
            });
    }
    
    handleChange(e){
        let { name, value } = e.target;
        
        this.setState({
            [name]: value
        });
    }
    
    handleModify(){
        let token = localStorage.getItem('tokenHeyf');
        
        if( token !== null){
            //token 유효성 체크
            let { gender, age_y, age_m, age_d, nationality, live_nationality, live_city, lang1, lang2, lang3, job, purpose, intro } = this.state;
            
            this.props.memberProfileModifyRequest(token, gender, age_y, age_m, age_d, nationality, live_nationality, live_city, lang1, lang2, lang3, job, purpose, intro)
                .then(() => {
                    
                });
        }else{
            alert('로그인 후 이용 가능한 서비스 입니다.');
            
            browserHistory.push('/member/login');
        }
    }
    
    render(){
        return (
            <div>
                <h3>Edit Profile</h3>
                <div>
                    <form>
                        <fieldset>
                            <legend>프로필수정</legend>
                            <ul className="frm_profile">
                                <li>
                                    <span className="tit">GENDER</span>
                                    <span>
                                        <input type="radio" name="gender" id="male" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange}/>
                                        <label htmlFor="male">MALE</label>
                                    </span>
                                    <span>
                                        <input type="radio" name="gender" id="female" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange}/>
                                        <label htmlFor="female">FEMALE</label>
                                    </span>
                                </li>
                                <li>
                                    <span className="tit"><label htmlFor="age_y">AGE</label></span>
                                    <span>
                                        <select name="age_y" id="age_y" value={this.state.age_y} onChange={this.handleChange} title="연도 선택">
                                            <option>YY</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                            <option value="2015">2015</option>
                                            <option value="2014">2014</option>
                                            <option value="2013">2013</option>
                                        </select>
                                        <select name="age_m" value={this.state.age_m} onChange={this.handleChange} title="월 선택">
                                            <option>MM</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                        <select name="age_d" value={this.state.age_d} onChange={this.handleChange} title="일 선택">
                                            <option>DD</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </span>
                                </li>
                                <li>
                                    <span className="tit"><label htmlFor="nationality">NATIONALITY</label></span>
                                    <span>
                                        <select name="nationality" id="nationality" value={this.state.nationality} onChange={this.handleChange}>
                                            <option>NATIONALITY</option>
                                            <option value="korea">KOREA</option>
                                            <option value="usa">USA</option>
                                        </select>
                                    </span>
                                </li>
                                <li>
                                    <span className="tit"><label htmlFor="live_nationality">LIVE IN</label></span>
                                    <span>
                                        <select name="live_nationality" id="live_nationality" value={this.state.live_nationality} onChange={this.handleChange}>
                                            <option>NATIONALITY</option>
                                            <option value="korea">KOREA</option>
                                            <option value="usa">USA</option>
                                        </select><br />
                                        <input type="text" name="live_city" placeholder="city" value={this.state.live_city} onChange={this.handleChange} title="거주지 도시 입력" />
                                    </span>
                                </li>
                                <li>
                                    <span className="tit"><label htmlFor="lang1">LANGUAGE</label></span>
                                    <span>
                                        <select name="lang1" id="lang1" value={this.state.lang1} onChange={this.handleChange} title="언어 1지망 선택">
                                            <option>LANGUAGE</option>
                                            <option value="korean">KOREAN</option>
                                            <option value="english">ENGLISH</option>
                                        </select>
                                        <select name="lang2" value={this.state.lang2} onChange={this.handleChange} title="언어 2지망 선택">
                                            <option>LANGUAGE</option>
                                            <option value="korean">KOREAN</option>
                                            <option value="english">ENGLISH</option>
                                        </select>
                                        <select name="lang3" value={this.state.lang3} onChange={this.handleChange} title="언어 3지망 선택">
                                            <option>LANGUAGE</option>
                                            <option value="korean">KOREAN</option>
                                            <option value="english">ENGLISH</option>
                                        </select>
                                    </span>
                                </li>
                                <li>
                                    <span className="tit"><label htmlFor="job">JOB</label></span>
                                    <span>
                                        <select name="job" id="job" value={this.state.job} onChange={this.handleChange}>
                                            <option>JOB</option>
                                            <option value="student">STUDENT</option>
                                            <option value="ceo">CEO</option>
                                            <option value="cto">CTO</option>
                                        </select>
                                    </span>
                                </li>
                                <li>
                                    <span className="tit"><label htmlFor="purpose">PURPOSE</label></span>
                                    <span>
                                        <select name="purpose" id="purpose" value={this.state.purpose} onChange={this.handleChange}>
                                            <option>purpose</option>
                                            <option value="study">study</option>
                                            <option value="find love">find love</option>
                                        </select>
                                    </span>
                                </li>
                                <li>
                                    <span className="tit"><label htmlFor="intro">INTRODUCE</label></span>
                                    <span>
                                        <textarea name="intro" id="intro" value={this.state.intro} onChange={this.handleChange}></textarea>
                                    </span>
                                </li>
                            </ul>
                            <a onClick={this.handleModify} className="btnS">수정</a>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    profile: React.PropTypes.object,
    memberProfileRequest: React.PropTypes.func,
    memberProfileModifyRequest: React.PropTypes.func
};

EditProfile.defaultProps = {
    profile: {},
    memberProfileRequest: () => {},
    memberProfileModifyRequest: () => {},
};

export default EditProfile;