import React, { Component } from 'react';
import { TblRow } from 'components';

class Tbl extends Component {
    shouldComponentUpdate(nextProps, nextState){
        let current = {
            props: this.props,
            state: this.state
        };
        
        let next = {
            props: nextProps,
            state: nextState
        };
        
        let update = JSON.stringify(current) !== JSON.stringify(next);
        return update;
    }
    
    render(){
        let mapToItems = (items) => {
            return items.map((item, i) => {
                let { title, author, content, date, num } = item;

                return (
                    <TblRow title={title}
                             author={author}
                             content={content}
                             date={date}
                             num={num}
                             key={i}/>
                );
            });
        };

        return (
            <table className="bbs1">
                <caption>테스트보드</caption>
                <colgroup>
                    <col width="7%" />
                    <col width="*" />
                    <col width="20%" />
                    <col width="20%" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성자</th>
                        <th scope="col">작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {mapToItems(this.props.items)}
                </tbody>
            </table>
        );
    }
}

Tbl.propTypes = {
    items: React.PropTypes.array
};

Tbl.defaultProps = {
    items: []
};

export default Tbl;
