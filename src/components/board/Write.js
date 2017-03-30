import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

class Write extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            author: '',
            title: '',
            content: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    
    handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        
        this.setState({
            [name]: value
        });
    }
    
    handleClick(){
        let { author, title, content } = this.state;
        
        this.props.onWrite(author, title, content)
            .then(() => {
                this.setState({
                    author: '',
                    title: '',
                    content: ''
                });
                
                browserHistory.push('/board/list/1');
            });
    }
    
    handleBack(){
        browserHistory.goBack();
    }
    
    render(){
        return (
            <div>
                <h3>글쓰기</h3>
                <form>
                    <fieldset>
                        <legend>게시판 입력 서식</legend>
                        <table className="bbs2">
                            <caption>게시판 입력 서식 표</caption>
                            <colgroup>
                                <col width="15%" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row"><label htmlFor="name">작성자</label></th>
                                    <td><input type="text" id="name" name="author" value={this.state.author} onChange={this.handleChange} /></td>
                                </tr>
                                <tr>
                                    <th scope="row"><label htmlFor="title">제목</label></th>
                                    <td><input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} /></td>
                                </tr>
                                <tr>
                                    <th scope="row"><label htmlFor="content">내용</label></th>
                                    <td><textarea name="content" id="content" value={this.state.content} onChange={this.handleChange}></textarea></td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="wrp_btn_r">
                            <a className="btn" onClick={this.handleClick}>저장</a>
                            <a className="btn" onClick={this.handleBack}>취소</a>
                        </p>
                    </fieldset>
                </form>
            </div>
        );
    }
}

Write.propTypes = {
    list: React.PropTypes.object,
    onWrite: React.PropTypes.func
};

Write.defaultProps = {
    list: {},
    onWrite: () => {}
};

export default Write;