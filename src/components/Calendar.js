import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMonth } from '../actions/calendar';
import { CalendarContainer, CalendarSummary, CalendarDay, DayNum, DayWeather } from '../styledComponents/calendar';
import contactDaysToWeather from '../functions/contactDaysToWeather';
import CalendarPopup from './CalendarPopup';

class Calendar extends Component {
	state = {
		modalIsOpen: false,
		selectedDay: {}
	};

	dayClick = (day) => {
		const clikedMonthNum = parseInt(day.monthNum);
		const selectedMonthNum = parseInt(this.props.selectedMonth.monthNum);

		if (clikedMonthNum > selectedMonthNum) {
			this.props.changeMonth(1);
		} else if (clikedMonthNum < selectedMonthNum) {
			this.props.changeMonth(-1);
		} else {
			this.setState(
				() => ({ selectedDay: day }),
				() => {
					this.toggleModal();
				}
			);
		}
	};

	toggleModal = () => {
		this.setState((state) => ({
			modalIsOpen: !state.modalIsOpen
		}));
	};

	render() {
		const { days } = this.props;
		const { month, year } = this.props.selectedMonth;
		const { modalIsOpen, selectedDay } = this.state;
		return (
			<CalendarContainer>
				<CalendarPopup selectedDay={selectedDay} modalIsOpen={modalIsOpen} closeModal={this.toggleModal} />
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

								{`${day.weather[0].main.temp} ℃`}
							</DayWeather>
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
		days: contactDaysToWeather(visibleDays, state.weather),
		selectedMonth
	};
};

const mapDispatchToProps = (dispatch) => ({
	changeMonth: (diff) => dispatch(changeMonth(diff))
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
