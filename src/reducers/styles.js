export default (state = {windowWidth: 0, subNavCollapsed: false}, action) => {
    const { type, windowWidth } = action;
    switch(type){
        case 'SET_WINDOW_WIDTH':
            return {
                ...state,
                windowWidth: windowWidth,
            }
        case 'TOGGLE_SUB_NAV':
			return {
                ...state,
				subNavCollapsed: !state.subNavCollapsed
			};
        default:
            return state
    }
}