import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import calendarReducer from '../reducers/calendar';
import weatherReducer from '../reducers/weather';
import itemsReducer from '../reducers/items';
import authReducer from '../reducers/auth';
import calendarModalReducer from '../reducers/calendarModal';
import stylesReducer from '../reducers/styles';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			calendar: calendarReducer,
			weather: weatherReducer,
			items: itemsReducer,
			auth: authReducer,
			calendarModal: calendarModalReducer,
			styles: stylesReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
