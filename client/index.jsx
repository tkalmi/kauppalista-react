import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import App from './containers/App.jsx';
import io from 'socket.io-client';
import {setList, addItem, updateItem, hideSpinner, getListFromServer, dontShowFrontPage, showError, showConnectionProblems, dismissConnectionProblems} from './actions/index';
import socketReduxMiddleware from './socket_redux_middleware';
require('./sass/main.scss');

// Development specific stuff
if (process.env.NODE_ENV === 'development') {
    // This is added per https://www.garysieling.com/blog/3183-2 so that components with only plain HTML would get hot reloaded too
    module.hot.accept();
}

// TODO: USE THESE WHEN USING IMMUTABLEJS
// https://github.com/maxnachlinger/redux-websocket-example
// const initialState = new Map()
//   .set('items', new List())
//   .set('showError', new List())
//   .set('errorMsg', new Map())

// Create SocketIO connection
let socket = io(`${location.protocol}//${location.hostname}:${process.env.PORT || 3000}`);

// Create Redux store with middleware to stream actions to the socket connection
const createStoreWithMiddleware = applyMiddleware(socketReduxMiddleware(socket))(createStore);

let store;
if (process.env.NODE_ENV === 'development') {
    store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());
} else {
    store = createStoreWithMiddleware(reducers);
}

// Don't show front page if URL already directs to a list
if (location.pathname.replace('/','')) {
  store.dispatch(dontShowFrontPage())
}

// Handle socket events
socket.on('connection', () => {
  store.dispatch(dismissConnectionProblems())
});
socket.on('set_list', list => {
    store.dispatch(setList(list))
});
socket.on('hide_spinner', () => {
    store.dispatch(hideSpinner())
});
socket.on('add_item', (item) => {
    store.dispatch(addItem(item))
});
socket.on('update_item', (item) => {
    store.dispatch(updateItem(item))
});
socket.on('show_error', (error) => {
    store.dispatch(showError(error))
});
socket.on('disconnect', () => {
    store.dispatch(showConnectionProblems())
});

ReactDOM.render(
    <Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));
