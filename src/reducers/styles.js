export default (
	state = { windowWidth: 0, subNavCollapsed: false, antdInputsSize: 'default' },
	action
) => {
	const { type } = action;
	switch (type) {
		case 'SET_WINDOW_WIDTH':
			const { windowWidth } = action;
			return {
				...state,
				windowWidth: windowWidth,
				antdInputsSize: windowWidth > 750 ? 'default' : 'small'
			};
		case 'TOGGLE_SUB_NAV':
			return {
				...state,
				subNavCollapsed: !state.subNavCollapsed
			};
		case 'SET_SCROLLBAR_WIDTH':
			return {
				...state,
				scrollbarWidth: action.scrollbarWidth
			};
		default:
			return state;
	}
};
