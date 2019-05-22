import { TOGGLE_CALENDAR_MODAL } from '../actionsNames';

const initialState = {
	modalIsOpen: false,
	selectedDay: {}
};

export default (state = { ...initialState }, action) => {
	const { type, modalIsOpen, selectedDay } = action;
	switch (type) {
		case TOGGLE_CALENDAR_MODAL:
			return {
				modalIsOpen,
				selectedDay
			};
		default:
			return state;
	}
};
