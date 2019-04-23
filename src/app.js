import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/style.scss';

import AppRouter, { history } from './routers/appRouter';
import configureStore from './store/configureStore';
import { setItems } from './actions/items';
import { firebase } from './database/firebase';
import { setWindowWidth } from './actions/styles';

const store = configureStore();

store.dispatch(setWindowWidth(window.innerWidth));
window.addEventListener('resize', () => {
	store.dispatch(setWindowWidth(window.innerWidth));
});

const App = () => (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

let appRendered = false;
const renderApp = () => {
	if (!appRendered) {
		ReactDOM.render(<App />, document.getElementById('root'));
	}
};

firebase.auth().onAuthStateChanged(async (user) => {
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
