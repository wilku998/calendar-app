import moment from 'moment';
import createMonthObject from '../functions/createMonthObject';
import getVisibleDays from '../functions/getVisibleDays';

const setInitialState = () => {
	const selectedMonth = createMonthObject(moment());
	const lastMonth = createMonthObject(moment().subtract(1, 'months'));
	const nextMonth = createMonthObject(moment().add(1, 'months'));
	const visibleDays = getVisibleDays(selectedMonth, lastMonth, nextMonth);

	return {
		selectedMonth,
		lastMonth,
		nextMonth,
		visibleDays
	};
};

export default (state = { ...setInitialState() }, action) => {
	const { type } = action;

	switch (type) {
		case 'CHANGE_MONTH':
			const { diff } = action;
			const operation = diff > 0 ? 'add' : 'subtract';
			const absoluteDiff = Math.abs(diff);

			const selectedMonth = createMonthObject(
				state.selectedMonth.momentFunction[operation](absoluteDiff, 'months')
			);
			const lastMonth = createMonthObject(state.lastMonth.momentFunction[operation](absoluteDiff, 'months'));
			const nextMonth = createMonthObject(state.nextMonth.momentFunction[operation](absoluteDiff, 'months'));
			return {
				...state,
				selectedMonth,
				lastMonth,
				nextMonth,
				visibleDays: getVisibleDays(selectedMonth, lastMonth, nextMonth)
			};

		default:
			return state;
	}
};
