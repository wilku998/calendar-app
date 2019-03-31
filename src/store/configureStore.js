import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import calendarReducer from '../reducers/calendar';
import wheatherReducer from '../reducers/wheather';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			calendar: calendarReducer,
			wheather: wheatherReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};
