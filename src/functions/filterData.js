export default (items, day) => {
	const { dayNum: selectedDayNum, monthNum: selectedMonthNum, year: selectedYear } = day;
	console.log({selectedDayNum, selectedMonthNum, selectedYear})
	return items.filter((e) => {
		const { dayNum, monthNum, year } = e.createdAt;
		return (selectedDayNum ? selectedDayNum === dayNum : true) && selectedMonthNum === monthNum && selectedYear === year;
	});
}