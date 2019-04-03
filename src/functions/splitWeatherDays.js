export default (weatherObject) => {
	const allDays = [ [ weatherObject.list[0] ] ];
	weatherObject.list.reduce((prevDay, day) => {
		if (prevDay.dt_txt.split(' ')[0] === day.dt_txt.split(' ')[0]) {
			allDays[allDays.length - 1].push(day);
		} else {
			allDays.push([ day ]);
		}
		return day;
	});
	return allDays;
};
