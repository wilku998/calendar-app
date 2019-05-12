import getSumOfBudgetItems from './getSumOfBudgetItems';

const setDate = ({ year, monthNum, dayNum }, timePeroid) => {
	let date;
	if(timePeroid.year==='all-years'){
		date = year
	}else if(timePeroid.month==='all-months'){
		date = `${year}-${monthNum}`
	}else{
		date = `${year}-${monthNum}-${dayNum}`
	}
	return date
};

export default (incomes, expenses, timePeroid) => {
	const points = [];

	[ ...incomes, ...expenses.map((e) => ({ ...e, value: e.value * -1 })) ].forEach((item) => {
		const itemDate = setDate(item.createdAt, timePeroid);
		const foundedIndex = points.findIndex((e) => e.date === itemDate);
		foundedIndex > -1 ? points[foundedIndex].items.push(item) : points.push({ date: itemDate, items: [ item ] });
	});

	points.sort((a, b) => {
		return parseInt(a.date.replace('-', '')) - parseInt(b.date.replace('-', ''));
	});

	return points.map((e) => ({ ...e, sum: getSumOfBudgetItems(e.items) }));
};
