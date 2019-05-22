const getRowPos = (day) => {
	// eslint-disable-next-line default-case
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
	for (let i = 1; i <= date.daysInMonth(); i += 1) {
		days.push({
			calendarRowPos: getRowPos(date.date(i).format('ddd')),
			dayNum: i.toString()
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
