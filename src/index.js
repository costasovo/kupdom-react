import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import kupdomApp from './reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

let store = createStore(kupdomApp)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
