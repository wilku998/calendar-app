import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import { styleCalendarDay, CalendarDayInfo, DayNum, DayWeather } from './StyledCalendarDay';
import theme from '../../../styledComponents/theme';

const CalendarDay = ({ day, dayClick, disabled, className }) => {
	const getWeather = (weatherArr) => {
		const half = Math.floor(weatherArr.length / 2);
		const weather = weatherArr[half];
		const timeInt = parseInt(weather.dt_txt.split(' ')[1]);
		const pm = timeInt >= 12;
		return (
			<DayWeather>
				<span>
					<span>{weather.main.temp} ℃</span>
				</span>
				<span>
					at {pm ? timeInt - 12 : timeInt} {pm ? 'p.m.' : 'a.m.'}
				</span>
			</DayWeather>
		);
	};

	return (
		<div className={className} disabled={disabled} onClick={() => dayClick(day)}>
			<DayNum>
				{day.dayNum} {day.day}
			</DayNum>

			<CalendarDayInfo>
				{day.containTasks && (
					<span>
						<Icon type="book" />
					</span>
				)}
				{day.containIncomes && (
					<span>
						<Icon style={{color: theme.colorRed}}color="green" type="rise" />
					</span>
				)}
				{day.containExpenses && (
					<span>
						<Icon style={{color: theme.colorGreen}}type="fall" />
					</span>
				)}
			</CalendarDayInfo>

			{day.weather ? getWeather(day.weather): ''}
		</div>
	);
};

CalendarDay.propTypes = {
	day: PropTypes.object.isRequired,
	dayClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	className: PropTypes.string.isRequired,
}
export default styleCalendarDay(CalendarDay);
