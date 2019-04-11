import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import calendarReducer from '../reducers/calendar';
import weatherReducer from '../reducers/weather';
import itemsReducer from '../reducers/items';
import authReducer from '../reducers/auth';
import modalReducer from '../reducers/modal';
import subNavigationReducer from '../reducers/subNavigation';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			calendar: calendarReducer,
			weather: weatherReducer,
			items: itemsReducer,
			auth: authReducer,
			modal: modalReducer,
			subNavigation: subNavigationReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
