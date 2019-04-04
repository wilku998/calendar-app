import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import configureStore from './store/configureStore';
import GeoForm from './components/GeoForm';
import Calendar from './components/Calendar';
import Navigation from './components/Navigation'
import { setData } from './actions/database';
import CalendarModal from './components/CalendarModal';

const store = configureStore();
store.dispatch(setData([ 'tasks', 'incomes', 'expenses' ]));

const App = () => (
	<div>
		<CalendarModal />
		<GeoForm />
		<Calendar />
		<Navigation />
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
