export default (days, wheather) => {
	let startDaysIndex = -1;
	let startWheatherIndex = -1;
	wheather.forEach((e) => {
		if (startDaysIndex === -1) {
			const [ year, todayMonth, day ] = e[0].dt_txt.split(' ')[0].split('-');
			startDaysIndex = days.findIndex(
				(e) => e.monthNum === todayMonth && e.dayNum === parseInt(day) && e.year === year
			);
			startWheatherIndex++;
		}
	});

	if (startDaysIndex > -1) {
		let contactedDays = 0;
		return days.map((day, i) => {
			if (startDaysIndex + contactedDays === i) {
				const obj = {
					...day,
					wheather: wheather[startWheatherIndex + contactedDays]
				};
				contactedDays++;
				return obj;
			}
			return day;
		});
	}
	return days;
};
