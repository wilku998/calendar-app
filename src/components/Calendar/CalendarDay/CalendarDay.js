import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import StyleDay, { CalendarDayInfo, DayNum, DayWeather, StyledDayContent, StyledDayPadding } from './StyledCalendarDay';
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

	const onDayClick = () => {
		dayClick(day);
	};

	return (
		<div role="button" className={className} disabled={disabled} onClick={onDayClick}>
			<StyledDayPadding>
				<StyledDayContent>
					<CalendarDayInfo>
						{day.containTasks && <Icon type="book" />}
						{day.containIncomes && <Icon style={{ color: theme.colorGreen }} type="rise" />}
						{day.containExpenses && <Icon style={{ color: theme.colorRed }} type="fall" />}
					</CalendarDayInfo>
					<DayNum>{day.dayNum}</DayNum>
					{day.weather ? getWeather(day.weather) : ''}
				</StyledDayContent>
			</StyledDayPadding>
		</div>
	);
};

CalendarDay.propTypes = {
	day: PropTypes.exact({
		containTasks: PropTypes.bool.isRequired,
		containIncomes: PropTypes.bool.isRequired,
		containExpenses: PropTypes.bool.isRequired,
		weather: PropTypes.array,
		calendarRowPos: PropTypes.number.isRequired,
		dayNum: PropTypes.string.isRequired,
		monthNum: PropTypes.string.isRequired,
		year: PropTypes.string.isRequired,
	}).isRequired,
	dayClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
	className: PropTypes.string.isRequired
};
export default React.memo(StyleDay(CalendarDay));
