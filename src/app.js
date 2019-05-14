import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/style.scss';

import AppRouter, { history } from './routers/appRouter';
import configureStore from './store/configureStore';
import { searchWeather } from './actions/weather';
import { setItems } from './actions/items';
import { firebase } from './database/firebase';
import { setWindowWidth } from './actions/styles';
import Loading from './components/Loading/Loading';

const store = configureStore();

store.dispatch(setWindowWidth(window.innerWidth));
window.addEventListener('resize', () => {
	store.dispatch(setWindowWidth(window.innerWidth));
});

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((pos) => {
		const { latitude, longitude } = pos.coords;
		//store.dispatch(searchWeather(latitude, longitude));
	});
}

const App = () => (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

const renderApp = () => {
	ReactDOM.render(<App />, document.getElementById('root'));
};

firebase.auth().onAuthStateChanged(async (user) => {
	ReactDOM.render(<Loading />, document.getElementById('root'));
	if (user) {
		store.dispatch({ type: 'LOGIN', uid: user.uid });
		await store.dispatch(setItems([ 'tasks', 'incomes', 'expenses' ]));
		renderApp();
		history.push('/');
	} else {
		store.dispatch({ type: 'LOGOUT' });
		renderApp();
	}
});
