import { sizes } from '../styledComponents/breakPoints';

const setMobileView = (width) => width <= sizes.small * 16;
const setAntdInputSize = (width) => width > sizes.mid * 16 ? 'default' : 'small';
const initialWindowWidth = window.innerWidth;

const initialState = {
	windowWidth: initialWindowWidth,
	subNavCollapsed: initialWindowWidth <= sizes.big * 16,
	antdInputsSize: setAntdInputSize(initialWindowWidth),
	mobileView: setMobileView(initialWindowWidth)
};

export default (state = initialState, action) => {
	const { type } = action;
	switch (type) {
		case 'SET_WINDOW_WIDTH':
			const { windowWidth } = action;
			let breakPoint = sizes.big * 16;
			let subNavCollapsed;

			if (windowWidth > breakPoint) {
				subNavCollapsed = false;
			} else if (windowWidth <= breakPoint && state.windowWidth > breakPoint) {
				subNavCollapsed = true;
			} else {
				subNavCollapsed = state.subNavCollapsed;
			}

			return {
				antdInputsSize: setAntdInputSize(windowWidth),
				mobileView: setMobileView(windowWidth),
				windowWidth,
				subNavCollapsed
			};
		case 'TOGGLE_SUB_NAV':
			return {
				...state,
				subNavCollapsed: !state.subNavCollapsed
			};
		default:
			return state;
	}
};
