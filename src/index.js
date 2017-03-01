import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App, Home, Boards, Board } from 'containers';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="board" component={Boards}>
                <Route path=":page" component={Board}/>
            </Route>
        </Route>
    </Router>, rootElement);
