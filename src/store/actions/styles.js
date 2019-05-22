import { SET_WINDOW_WIDTH, TOGGLE_SUB_NAV } from '../actionsNames';

// eslint-disable-next-line import/prefer-default-export
export const setWindowWidth = (windowWidth) => ({
	type: SET_WINDOW_WIDTH,
	windowWidth
});

export const toggleSubNav = () => ({
	type: TOGGLE_SUB_NAV,
});
