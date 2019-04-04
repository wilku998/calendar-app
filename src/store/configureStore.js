import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import calendarReducer from '../reducers/calendar';
import weatherReducer from '../reducers/weather';
import tasksReducer from '../reducers/tasks';
import budgetReducer from '../reducers/budget';
import authReducer from '../reducers/auth';
import modalReducer from '../reducers/modal';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			calendar: calendarReducer,
			weather: weatherReducer,
			tasks: tasksReducer,
			auth: authReducer,
			budget: budgetReducer,
			modal: modalReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
