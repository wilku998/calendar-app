import removeItem from '../functions/removeItemFromArr';

const initialState = {
	incomes: [],
	expenses: [],
	tasks: []
};

export default (state = { ...initialState }, action) => {
	const { type, kind } = action;
	switch (type) {
		case 'ADD_ITEM':
			return {
				...state,
				[kind]: [ ...state[kind], action.item ]
			};
		case 'REMOVE_ITEM':
			const { id } = action;
			return {
				...state,
				[kind]: removeItem(state[kind], id)
			};
		case 'REMOVE_ALL_ITEMS':
			return {
				...state,
				[kind]: []
			};
		case 'SET_ITEMS':
			return {
				...state,
				[kind]: action.items
			};
		default:
			return state;
	}
};
