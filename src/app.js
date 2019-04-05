import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/style.scss';

import styled from 'styled-components'
import configureStore from './store/configureStore';
import GeoForm from './components/GeoForm';
import Calendar from './components/Calendar';
import Navigation from './components/Navigation'
import { setData } from './actions/database';
import CalendarModal from './components/CalendarModal';

const store = configureStore();
store.dispatch(setData([ 'tasks', 'incomes', 'expenses' ]));

const App = () => (
	<Fragment>
		<CalendarModal />
		<Navigation />
		<Main>
			<GeoForm />
			<Calendar />
		</Main>
	</Fragment>
);

const Main = styled.main`
	margin-left: 25rem;
	color: black;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center
`
const AppRouter = () => (
	<Provider store={store}>
		<Router>
			<Route path="/" component={App} />
		</Router>
	</Provider>
);
ReactDOM.render(<AppRouter />, document.getElementById('root'));
