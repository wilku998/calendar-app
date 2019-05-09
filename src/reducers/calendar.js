import createMonthObject from '../functions/createMonthObject';
import getVisibleDays from '../functions/getVisibleDays';
import momentOperation from '../functions/momentOperation';
import now from '../staticData/now';

const setInitialState = () => {
	const selectedMonth = createMonthObject(now.momentFunc.clone());
	const visibleDays = getVisibleDays(selectedMonth);

	return {
		selectedMonth,
		visibleDays,
		monthDiff: 0,
		yearDiff: 0
	};
};

export default (state = { ...setInitialState() }, action) => {
	const { type } = action;
	switch (type) {
		case 'CHANGE_CALENDAR_DATE':
			const { monthDiff, yearDiff } = action;
			const selectedMonth = createMonthObject(momentOperation(now.momentFunc, monthDiff, yearDiff));

			return {
				...state,
				selectedMonth,
				visibleDays: getVisibleDays(selectedMonth),
				monthDiff,
				yearDiff
			};

		default:
			return state;
	}
};
