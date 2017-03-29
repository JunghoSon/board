import React, { Component } from 'react';
import { Link } from 'react-router';

class Pagenation extends Component {
    render(){
        let { prev, next, current, pages } = this.props;

        let prevBtn = (
            <Link to={`/board/list/${prev}`}>prev</Link>
        );

        let nextBtn = (
            <Link to={`/board/list/${next}`}>next</Link>
        );

        let mapToPages = (pages) => {
            return pages.map((page, i) => {
                return (
                    <Link to={`/board/list/${page}`} className={(page === current)? 'on' : undefined} key={i}>{page}</Link>
                );
            });
        };

        return (
            <div className="pagenation">
                {(prev < 0) ? undefined : prevBtn}
                {mapToPages(pages)}
                {(next < 0) ? undefined : nextBtn}
            </div>
        );
    }
}

Pagenation.propTypes = {
    prev: React.PropTypes.number,
    next: React.PropTypes.number,
    current: React.PropTypes.number,
    pages: React.PropTypes.array
};

Pagenation.defaultProps = {
    prev: 0,
    next: 0,
    current: 0,
    pages: []
};

export default Pagenation;
