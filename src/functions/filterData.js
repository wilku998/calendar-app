export default (items, day) => {
	const { dayNum: selectedDayNum, monthNum: selectedMonthNum, year: selectedYear } = day;
	return items.filter((e) => {
		const { dayNum, monthNum, year } = e.createdAt;
		return (selectedDayNum ? selectedDayNum === dayNum : true) && selectedMonthNum === monthNum && selectedYear === year;
	});
}