import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import StyleDay, {
	CalendarDayInfo,
	DayNum,
	DayWeather,
	StyledDayContent,
	StyledDayPadding,
	
} from './StyledCalendarDay';
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
		<div className={className} disabled={disabled} onClick={onDayClick}>
			<StyledDayPadding>
				<StyledDayContent>
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
								<Icon style={{ color: theme.colorGreen }} type="rise" />
							</span>
						)}
						{day.containExpenses && (
							<span>
								<Icon style={{ color: theme.colorRed }} type="fall" />
							</span>
						)}
					</CalendarDayInfo>
					{day.weather ? getWeather(day.weather) : ''}
				</StyledDayContent>
			</StyledDayPadding>
		</div>
	);
};

CalendarDay.propTypes = {
	day: PropTypes.object.isRequired,
	dayClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired
};
export default React.memo(StyleDay(CalendarDay));
