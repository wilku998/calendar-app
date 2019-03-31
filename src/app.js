import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import GeoForm from './components/GeoForm';
import Calendar from './components/Calendar';
import './styles/style.scss';

const store = configureStore();

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
