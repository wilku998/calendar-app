import removeItem from '../../functions/removeItemFromArr';
import { ADD_ITEM, REMOVE_ITEM, SET_ITEMS, LOGOUT } from '../actionsNames';

const initialState = {
	incomes: [],
	expenses: [],
	tasks: []
};

export default (state = { ...initialState }, action) => {
	const { type, kind } = action;
	switch (type) {
		case ADD_ITEM:
			return {
				...state,
				[kind]: [ ...state[kind], action.item ]
			};
		case REMOVE_ITEM: {
			const { id } = action;
			return {
				...state,
				[kind]: removeItem(state[kind], id)
			};
		}
		case SET_ITEMS:
			return {
				...state,
				[kind]: action.items
			};
		case LOGOUT:
			return {
				...initialState
			};
		default:
			return state;
	}
};
