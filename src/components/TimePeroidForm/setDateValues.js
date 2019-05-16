import monthsData from '../../staticData/months';
import now from '../../staticData/now';

export default (timePeroid) => {
	const selectedYearInt = parseInt(timePeroid.year);
	const years = [];
	let yearValue = timePeroid.year;
	for (let i = 0; i <= 10; i++) {
		const year = now.yearInt + (i - 5);
		const value = i - 5;
		if (year === selectedYearInt) {
			yearValue = value;
		}
		years.push({
			year,
			value
		});
	}

	let monthValue = timePeroid.month;
	const months = monthsData.map((e, i) => {
		const value = i + 1 - now.monthInt;
		if (e === timePeroid.month) {
			monthValue = value;
		}
		return {
			month: e,
			value
		};
	});
	return [ { months, monthValue }, { years, yearValue } ];
};
