import getSumOfBudgetItems from './getSumOfBudgetItems';

const getFullDate = (date) => {
	const { dayNum, monthNum, year } = date;
	return `${year}-${monthNum}-${dayNum}`;
};

export default (incomes, expenses) => {
	const points = [];

	[ ...incomes, ...expenses.map((e) => ({ ...e, value: e.value * -1 })) ].forEach((item) => {
		const itemDate = getFullDate(item.createdAt);
		const foundedIndex = points.findIndex((e) => e.date === itemDate);
		foundedIndex > -1 ? points[foundedIndex].items.push(item) : points.push({ date: itemDate, items: [ item ] });
	});

	points.sort((a, b) => {
		return parseInt(a.date.replace('-', '')) - parseInt(b.date.replace('-', ''));
	});

	return points.map((e) => ({ ...e, sum: getSumOfBudgetItems(e.items) }));
};