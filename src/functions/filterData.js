export default (items, time) => {
	const { dayNum: selectedDayNum, monthNum: selectedMonthNum, year: selectedYear } = time;
	return items.filter((e) => {
		const { dayNum, monthNum, year } = e.createdAt;
		return (
			(!selectedDayNum || selectedDayNum === dayNum) &&
			(selectedMonthNum==='all-months' || selectedMonthNum === monthNum) &&
			(selectedYear==='all-years' || selectedYear === year)
		);
	});
};
