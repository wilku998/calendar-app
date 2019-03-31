import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMonth } from '../actions/calendar';
import { CalendarContainer, CalendarSummary, CalendarDay, DayNum, DayWheather } from '../styledComponents/calendar';
import contactDaysToWheather from '../functions/contactDaysToWheather';

class Calendar extends Component {
	state = {};

	dayClick = (day) => {
		const clikedMonthNum = parseInt(day.monthNum);
		const selectedMonthNum = parseInt(this.props.selectedMonth.monthNum);

		if (clikedMonthNum > selectedMonthNum) {
			this.props.changeMonth(1);
		} else if (clikedMonthNum < selectedMonthNum) {
			this.props.changeMonth(-1);
		} else {
			//fancy things...
		}
	};

	render() {
		const { days } = this.props;
		const { month, year } = this.props.selectedMonth;
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

						{day.wheather && (
							<DayWheather>
								<img src={`http://openweathermap.org/img/w/${day.wheather[0].weather[0].icon}.png`} />

								{`${day.wheather[0].main.temp} ℃`}
							</DayWheather>
						)}
					</CalendarDay>
				))}
			</CalendarContainer>
		);
	}
}

const mapStateToProps = (state) => {
	const { visibleDays, selectedMonth } = state.calendar;
	return {
		days: contactDaysToWheather(visibleDays, state.wheather),
		selectedMonth
	};
};

const mapDispatchToProps = (dispatch) => ({
	changeMonth: (diff) => dispatch(changeMonth(diff))
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
