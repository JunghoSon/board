import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import { App, Home, Board, List, Write, Detial, Err } from 'containers';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="board" component={Board}>
                    <Route path="list" component={List}>
                        <IndexRoute component={List}/>
                        <Route path=":page" component={List}/>
                    </Route>
                    <Route path="write" component={Write}/>
                    <Route path="detail/:id" component={Detail}/>
                </Route>
                <Route path="err" component={Err}/>
            </Route>
        </Router>
    </Provider>, rootElement);
