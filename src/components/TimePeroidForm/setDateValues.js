import { monthsData } from '../../staticData/months';
import now from '../../staticData/now';

export default (timePeroid) => {
    const selectedYearInt = parseInt(timePeroid.year);
	const years = [];
	let yearValue;
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

	let monthValue;
	const months = monthsData.map((e) => {
		const value = e.value - now.monthInt;
		if (e.month === timePeroid.month) {
			monthValue = value;
		}
		return {
			...e,
			value
		};
    });
    return [{months, monthValue}, {years, yearValue}]
}