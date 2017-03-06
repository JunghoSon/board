import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardWriteRequest } from 'actions/board';
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
        
        this.props.boardWriteRequest(author, title, content)
            .then(() => {
                this.setState({
                    author: '',
                    title: '',
                    content: ''
                });
                
                browserHistory.push('/board/list/1');
            });
    }
    
    render(){
        let current = (typeof this.props.current === 'undefined') ? 1 : this.props.current;
        let btn_cancel = (
            <Link to={`/board/list/${current}`} className="btn">취소</Link>
        );
        
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
                            {btn_cancel}
                        </p>
                    </fieldset>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.board.write.status,
        current: state.board.list.pagenation.current
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        boardWriteRequest: (author, title, content) => {
            return dispatch(boardWriteRequest(author, title, content));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Write);