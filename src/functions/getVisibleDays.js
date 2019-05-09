import createMonthObject from './createMonthObject';

export default (month) => {
	const firstDayPos = month.days[0].calendarRowPos;
	const lastDayPos = month.days[month.days.length - 1].calendarRowPos;

	let visibleDays = month.days.map((e) => ({
		...e,
		monthNum: month.monthNum,
		year: month.year
	}));

	if (firstDayPos > 1) {
		const daysToGet = Math.abs(1 - firstDayPos);
		const lastMonth = createMonthObject(month.momentFunction.clone().subtract(1, 'months'))
		visibleDays = [
			...lastMonth.days
				.slice(lastMonth.days.length - daysToGet)
				.map((e) => ({ ...e, monthNum: lastMonth.monthNum, year: lastMonth.year })),
			...visibleDays
		];
	}
	if (lastDayPos < 7) {
		const daysToGet = 7 - lastDayPos;
		const nextMonth = createMonthObject(month.momentFunction.clone().add(1, 'months'))
		visibleDays = [
			...visibleDays,
			...nextMonth.days
				.slice(0, daysToGet)
				.map((e) => ({ ...e, monthNum: nextMonth.monthNum, year: nextMonth.year }))
		];
	}

	return visibleDays;
};


