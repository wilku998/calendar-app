export default (state = { collapsed: false }, action) => {
	const { type } = action;
	switch (type) {
		case 'TOGGLE_SUB_NAV':
			return {
				collapsed: !state.collapsed
			};
		default:
			return state;
	}
};
