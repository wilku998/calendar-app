import { CHANGE_CALENDAR_DATE } from '../actionsNames';

// eslint-disable-next-line import/prefer-default-export
export const changeCalendarDate = (monthDiff, yearDiff) => ({
	type: CHANGE_CALENDAR_DATE,
	monthDiff,
	yearDiff
});
