import React, { Component } from 'react';
import { connect } from 'react-redux';

class Err extends Component {
    render(){
        return (
            <div>
                <p>서버오류 입니다~!</p>
                <p>{this.props.error.message}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.board.list.error
    };
}

export default connect(mapStateToProps, null)(Err);