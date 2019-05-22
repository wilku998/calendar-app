import { TOGGLE_CALENDAR_MODAL } from '../actionsNames';

// eslint-disable-next-line import/prefer-default-export
export const toggleCalendarModal = (modalIsOpen, selectedDay) => ({
	type: TOGGLE_CALENDAR_MODAL,
	modalIsOpen,
	selectedDay: selectedDay || {}
});
