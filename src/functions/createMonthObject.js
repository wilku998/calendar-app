const getRowPos = (day) => {
	switch (day) {
		case 'Mon':
			return 1;
		case 'Tue':
			return 2;
		case 'Wed':
			return 3;
		case 'Thu':
			return 4;
		case 'Fri':
			return 5;
		case 'Sat':
			return 6;
		case 'Sun':
			return 7;
	}
};

export default (date) => {
	const days = [];
	for (let i = 1; i <= date.daysInMonth(); i++) {
		const day = date.date(i).format('ddd');
		days.push({
			day,
			calendarRowPos: getRowPos(day),
			dayNum: i
		});
	}
	return {
		days,
		month: date.format('MMMM'),
		monthNum: date.format('MM'),
		year: date.format('YYYY'),
		momentFunction: date
	};
};
