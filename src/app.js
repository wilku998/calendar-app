import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import configureStore from './store/configureStore';
import GeoForm from './components/GeoForm';
import Calendar from './components/Calendar';
import { setData } from './actions/database';

const store = configureStore();
store.dispatch(setData([ 'tasks', 'incomes', 'expenses' ]));

const App = () => (
	<div>
		<GeoForm />
		<Calendar />
	</div>
);

const AppRouter = () => (
	<Provider store={store}>
		<Router>
			<Route path="/" component={App} />
		</Router>
	</Provider>
);
ReactDOM.render(<AppRouter />, document.getElementById('root'));
