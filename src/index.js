import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import { 
    App, Home, Board, Err, Member
} from 'containers';
import {
    List, Write, Detail, Login, Register
} from 'components';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="board" component={Board}>
                    <IndexRoute component={List}/>
                    <Route path="list" component={List}>
                        <Route path=":page" component={List}/>
                    </Route>
                    <Route path="detail/:id" component={Detail}/>
                    <Route path="write" component={Write}/>
                </Route>
                <Route path="err" component={Err}/>
                <Route path="member" component={Member}>
                    <IndexRoute component={Login}/>
                    <Route path="login" component={Login}/>
                    <Route path="register" component={Register}/>
                </Route>
            </Route>
        </Router>
    </Provider>, rootElement);
