import removeItem from '../functions/removeItemFromArr';

const initialState = {
	incomes: [],
	expenses: []
};

export default (state = { ...initialState }, action) => {
	let { kind } = action;
	const { type } = action;
	switch (type) {
		case 'ADD_BUDGET_ITEM':
			return {
				...state,
				[kind]: [...state[kind], action.item]
			};
		case 'REMOVE_BUDGET_ITEM':
			const { id } = action;
			return {
				...state,
				[kind]: removeItem(state[kind], id)
			};
		case 'REMOVE_ALL_BUDGET':
			return {
				...state,
				[kind]: []
			};
		case 'SET_INCOMES' || 'SET_EXPENSES':
			const actionKeys = Object.keys(action);
			kind = actionKeys.find((e) => e === 'incomes' || e === 'expenses');
			return {
				...state,
				[kind]: action[kind]
			};
		default:
			return state;
	}
};
