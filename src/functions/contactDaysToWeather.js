export default (days, weather) => {
	let startDaysIndex = -1;
	let startWeatherIndex = -1;
	weather.forEach((e) => {
		if (startDaysIndex === -1) {
			const [ year, todayMonth, day ] = e[0].dt_txt.split(' ')[0].split('-');
			startDaysIndex = days.findIndex(
				(e) => e.monthNum === todayMonth && parseInt(e.dayNum) === parseInt(day) && e.year === year
				// parseInt because if day is 3 'e.dayNum' would by 3 and 'day' 03
			);
			startWeatherIndex += 1;
		}
	});

	if (startDaysIndex > -1) {
		let contactedDays = 0;
		return days.map((day, i) => {
			if (startDaysIndex + contactedDays === i && contactedDays <= weather.length) {
				const obj = {
					...day,
					weather: weather[startWeatherIndex + contactedDays]
				};
				contactedDays += 1;
				return obj;
			}
			return day;
		});
	}
	return days;
};
