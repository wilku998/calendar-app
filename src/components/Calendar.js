import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Icon } from 'antd';
import PropTypes from 'prop-types';
import { changeMonth } from '../actions/calendar';
import { toggleModal } from '../actions/modal';
import { CalendarContainer, CalendarSummary, CalendarDay, DayNum, DayWeather, CalendarDayInfo } from '../styledComponents/calendar';
import contactDaysToWeather from '../functions/contactDaysToWeather';
import { monthsData } from '../fakedata/months';
import getSumOfBudgetItems from '../functions/getSumOfBudgetItems';
import filterData from '../functions/filterData';

const { Option } = Select;
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
		return (
			<DayWeather>
				<span>
					{/* <DayWeatherImage src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} /> */}
					<span>{weather.main.temp} ℃</span>
				</span>
				<span>
					at {pm ? timeInt - 12 : timeInt} {pm ? 'p.m.' : 'a.m.'}
				</span>
			</DayWeather>
		)
	};

	onMonthChange = (value) => {
		this.props.changeMonth(value)
	}
	render() {
		const { days } = this.props;
		const { month, year, monthNum } = this.props.selectedMonth;
		const monthNumInt = parseInt(monthNum);
		const yearNumInt = parseInt(year);
		
		const years = []
		for (let i=0; i<=10; i++){
			years.push({
				year: yearNumInt + (i-5),
				value: (i-5)*12
			})
		}
		const months = monthsData.map(e => ({...e, value: e.value-monthNumInt}))
		return (
			<CalendarContainer>
				<CalendarSummary>

					{[{years, key: 'year'}, {months, key: 'month'}].map(e => (
						<Select key={e.key} value={0} onChange={this.onMonthChange} style={{width: '15rem'}}>
							{e[`${e.key}s`].map(subElement => (
								<Option key={subElement[e.key]} value={subElement.value}>{subElement[e.key]}</Option>
							))}
						</Select>
					))}
				</CalendarSummary>
				{days.map((day, i) => (
					<CalendarDay
						key={i}
						disabled={day.monthNum !== monthNum}
						onClick={() => this.dayClick(day)}
					>
						<DayNum>{day.dayNum} {day.day}</DayNum>

						<CalendarDayInfo>
							{day.containTasks && <span><Icon type='book' /></span>}
							{day.containIncomes && <span><Icon type='rise' /></span>}
							{day.containExpenses && <span><Icon type='fall' /></span>}
						</CalendarDayInfo>


						{day.weather && this.getWeather(day.weather)}
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
	const { tasks } = state;
	const { incomes, expenses } = state.budget;

	//filtering data for selected month
	const [ filteredTasks, filteredIncomes, filteredExpenses ] = [tasks, incomes, expenses].map(items => {
		return filterData(items, selectedMonth)
	})

	//checking if is any item created at visible days
	const containItem = (items, day) => {
		const i = items.findIndex(e => {
			const { year, monthNum, dayNum } = e.createdAt;
			return year === day.year && monthNum === day.monthNum && dayNum === day.dayNum
		})
		return i>=0
	}

	const days = contactDaysToWeather(visibleDays, state.weather).map(e => ({
		...e,
		containTasks: containItem(filteredTasks, e),
		containExpenses: containItem(filteredExpenses, e),
		containIncomes: containItem(filteredIncomes, e)
	}))

	return {
		days,
		selectedMonth,
		tasksQuantity: filteredTasks.length,
		expensesQuantity: filteredExpenses.length,
		incomesQuantity: filteredIncomes.length,
		budgetForMonth: getSumOfBudgetItems(filteredIncomes) - getSumOfBudgetItems(filteredExpenses)
	};
};

const mapDispatchToProps = (dispatch) => ({
	changeMonth: (diff) => dispatch(changeMonth(diff)),
	openModal: (selectedDay) => dispatch(toggleModal(true, selectedDay))
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

