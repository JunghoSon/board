import React, { Component } from 'react';

class Detail extends Component {
    componentDidMount(){
        this.props.onDetail(this.props.params.id)
            .then(() => {
                //do something for success
            })
            .catch(() => {
                //do something for failure
            });
    }
    
    componentWillUnmount(){
        this.props.detail.board = {};
    }
    
    render(){
        console.log('render');
        let { title, author, date, content } = this.props.detail.board;
        
        return (
            <div>
                <h3>상세보기</h3>
                <table className="bbs3">
                    <caption></caption>
                    <colgroup>
                        <col width="15%" />
                        <col width="35%" />
                        <col width="15%" />
                        <col width="35%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th scope="row">제목</th>
                            <td colSpan="3">{ title }</td>
                        </tr>
                        <tr>
                            <th scope="row">작성자</th>
                            <td>{ author }</td>
                            <th scope="row">작성시간</th>
                            <td>{ date }</td>
                        </tr>
                        <tr>
                            <th scope="row">내용</th>
                            <td colSpan="3">{ content }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
}

Detail.propTypes = {
    detail: React.PropTypes.object,
    onDetail: React.PropTypes.func
};

Detail.defaultProps = {
    detail: {},
    onDetail: () => {
        console.log('Detail func is not defined');
    }
};

export default Detail;