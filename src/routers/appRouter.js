import { Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';

import App from '../components/App/App';
import Login from '../components/Login/Login';
import theme from '../styledComponents/theme';

export const history = createBrowserHistory();

export default () => (
	<Router history={history}>
		<ThemeProvider theme={theme}>
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/login" component={Login} />
			</Switch>
		</ThemeProvider>
	</Router>
);
