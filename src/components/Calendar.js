import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeMonth } from '../actions/calendar';
import { toggleModal } from '../actions/modal';
import { CalendarContainer, CalendarSummary, CalendarDay, DayNum, DayWeather } from '../styledComponents/calendar';
import contactDaysToWeather from '../functions/contactDaysToWeather';
class Calendar extends Component {
	state = {

	};

	dayClick = (day) => {
		const clikedMonthNum = parseInt(day.monthNum);
		const selectedMonthNum = parseInt(this.props.selectedMonth.monthNum);

		if (clikedMonthNum > selectedMonthNum) {
			this.props.changeMonth(1);
		} else if (clikedMonthNum < selectedMonthNum) {
			this.props.changeMonth(-1);
		} else {
			this.props.openModal(day)
		}
	};


	getWeather = (weatherArr) => {
		const half = Math.ceil(weatherArr.length / 2);
		const weather = weatherArr[half];
		const timeInt = parseInt(weather.dt_txt.split(' ')[1]);
		const pm = timeInt >= 12;
		return `${pm ? timeInt - 12 : timeInt} ${pm ? 'p.m.' : 'a.m.'} ${weather.main.temp}`;
	};

	render() {
		const { days } = this.props;
		const { month, year } = this.props.selectedMonth;
		const { modalIsOpen, selectedDay } = this.state;
		return (
			<CalendarContainer>
				<CalendarSummary>
					{year} {month}
					<button onClick={() => this.props.changeMonth(-1)}>prev month</button>
					<button onClick={() => this.props.changeMonth(1)}>next month</button>
				</CalendarSummary>
				{days.map((day, i) => (
					<CalendarDay
						key={i}
						disabled={day.monthNum !== this.props.selectedMonth.monthNum}
						onClick={() => this.dayClick(day)}
					>
						<DayNum>{day.dayNum}</DayNum>
						{day.day}

						{day.weather && (
							<DayWeather>
								<img src={`http://openweathermap.org/img/w/${day.weather[0].weather[0].icon}.png`} />

								{`${this.getWeather(day.weather)} ℃`}
							</DayWeather>
						)}
					</CalendarDay>
				))}
			</CalendarContainer>
		);
	}
}

Calendar.propTypes = {
	days: PropTypes.array,
	selectedMonth: PropTypes.object
};

const mapStateToProps = (state) => {
	const { visibleDays, selectedMonth } = state.calendar;
	return {
		days: contactDaysToWeather(visibleDays, state.weather),
		selectedMonth
	};
};

const mapDispatchToProps = (dispatch) => ({
	changeMonth: (diff) => dispatch(changeMonth(diff)),
	openModal: (selectedDay) => dispatch(toggleModal(true, selectedDay))
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
