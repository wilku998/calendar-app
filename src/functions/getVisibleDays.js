export default (month, lastMonth, nextMonth) => {
	const firstDayPos = month.days[0].calendarRowPos;
	const lastDayPos = month.days[month.days.length - 1].calendarRowPos;

	let visibleDays = month.days.map((e) => ({
		...e,
		monthNum: month.monthNum,
		year: month.year
	}));

	if (firstDayPos > 1) {
		const daysToGet = Math.abs(1 - firstDayPos);
		visibleDays = [
			...lastMonth.days
				.slice(lastMonth.days.length - daysToGet)
				.map((e) => ({ ...e, monthNum: lastMonth.monthNum, year: lastMonth.year })),
			...visibleDays
		];
	}
	if (lastDayPos < 7) {
		const daysToGet = 7 - lastDayPos;
		visibleDays = [
			...visibleDays,
			...nextMonth.days
				.slice(0, daysToGet)
				.map((e) => ({ ...e, monthNum: nextMonth.monthNum, year: nextMonth.year }))
		];
	}

	return visibleDays;
};

const getMonthNum = (month) => {
	switch (month) {
		case 'January':
			return '01';
		case 'February':
			return '02';
		case 'March':
			return '03';
		case 'April':
			return '04';
		case 'May':
			return '05';
		case 'June':
			return '06';
		case 'July':
			return '07';
		case 'August':
			return '08';
		case 'September':
			return '09';
		case 'October':
			return '10';
		case 'November':
			return '11';
		case 'December':
			return '12';
	}
};
