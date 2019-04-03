import removeItem from '../functions/removeItemFromArr';

export default (state = [], action) => {
	const { type } = action;
	switch (type) {
		case 'ADD_TASK':
			return [ ...state, action.task ];
		case 'REMOVE_TASK':
			return removeItem(state, action.id);
		case 'SET_TASKS':
			return [...action.tasks]
		default:
			return state;
	}
};
