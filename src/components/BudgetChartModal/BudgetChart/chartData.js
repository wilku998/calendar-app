import theme from '../../../styledComponents/theme';
import monthsData from '../../../staticData/months';
import getMonthName from '../../../functions/getMonthName';

export default (points, timePeroid) => {
	const allMonths = timePeroid.month === 'all-months';
	const allYears = timePeroid.year === 'all-years';
	let labels = [];
	let data;
	if (points.length > 0) {
		if (allYears) {
			[ labels, data ] = [ 'date', 'sum' ].map((property) => points.map((e) => e[property]));
		} else if (allMonths) {
			const startMonthNum = parseInt(points[0].items[0].createdAt.monthNum);
			const endMonthNum = parseInt(points[points.length - 1].items[0].createdAt.monthNum);

			labels = monthsData.filter((e, i) => i + 1 <= endMonthNum && i + 1 >= startMonthNum);
			data = points.map((e, i) => ({ x: getMonthName(e.items[0].createdAt.monthNum), y: e.sum }));
		} else {
			const startDayNum = parseInt(points[0].items[0].createdAt.dayNum);
			const endNum = parseInt(points[points.length - 1].items[0].createdAt.dayNum);
			for (let i = startDayNum; i <= endNum; i++) {
				labels.push(i);
			}
			data = points.map((e, i) => ({ x: parseInt(e.items[0].createdAt.dayNum), y: e.sum }));
		}
	}
	return {
		labels,
		datasets: [
			{
				label: 'Budget',
				data,
				borderColor: theme.colorBlue4,
				lineTension: 0.2,
				pointHoverBorderWidth: 2,
				borderWidth: 1
			}
		]
	};
};
