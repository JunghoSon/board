import React, { Component } from 'react';
import { Tbl, Pagenation } from 'components';
import { Link, browserHistory } from 'react-router';

class List extends Component {
    componentDidMount(){
        this.props.onList(this.props.params.page)
            .then(() => {
                //do success
            })
            .catch((err) => {
                //do failure
                browserHistory.push('/err');
            });
    }

    componentWillReceiveProps(nextProps){
        if(this.props.params.page !== nextProps.params.page){
            this.props.onList(nextProps.params.page);
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        let update = JSON.stringify(this.props.list.items) !== JSON.stringify(nextProps.list.items);
        return update;
    }

    render(){
        let { items, pagenation } = this.props.list;

        return (
            <div>
                <h3>리스트</h3>
                <Tbl items={items}/>
                <p className="wrp_btn_r"><Link to="/board/write" className="btn">글쓰기</Link></p>
                <Pagenation prev={pagenation.prevPage}
                            next={pagenation.nextPage}
                            current={pagenation.current}
                            pages={pagenation.pages}/>
            </div>
        );
    }
}

List.propTypes = {
    list: React.PropTypes.object,
    onList: React.PropTypes.func
};

List.defaultProps = {
    list: {},
    onList: () => {
        console.log('List func is not defined');
    }
};

export default List;
