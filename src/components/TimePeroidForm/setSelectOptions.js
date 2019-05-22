import monthsData from '../../staticData/months';
import now from '../../staticData/now';

export default () => {
	const years = [];
	for (let i = 0; i <= 10; i += 1) {
		const year = now.yearInt + (i - 5);
		const value = i - 5;

		years.push({
			year: year.toString(),
			value
		});
	}

	const months = monthsData.map((e, i) => {
		const value = i + 1 - now.monthInt;

		return {
			month: e,
			value
		};
	});
	return { months, years };
};
