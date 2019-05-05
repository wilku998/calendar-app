import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeMonth } from '../../actions/calendar';
import { toggleCalendarModal } from '../../actions/calendarModal';
import styleCalendar from './styledCalendar';
import CalendarSummary from './CalendarSummary/CalendarSummary';
import CalendarDay from './CalendarDay/CalendarDay';
import contactDaysToWeather from '../../functions/contactDaysToWeather';
import getSumOfBudgetItems from '../../functions/getSumOfBudgetItems';
import filterData from '../../functions/filterData';

const Calendar = ({ days, budget, tasksQuantity, className, selectedMonth, openCalendarModal, changeMonth }) => {
	const { year, monthNum } = selectedMonth;
	const componentRef = React.createRef();

	const dayClick = (day) => {
		const clikedMonthNum = parseInt(day.monthNum);
		const selectedMonthNum = parseInt(selectedMonth.monthNum);

		if (clikedMonthNum > selectedMonthNum) {
			changeMonth(1);
		} else if (clikedMonthNum < selectedMonthNum) {
			changeMonth(-1);
		} else {
			openCalendarModal(day);
		}
	};

	const onMonthChange = (value) => {
		changeMonth(value);
	};

	return (
		<section ref={componentRef} className={className}>
			<CalendarSummary
				monthInt={parseInt(monthNum)}
				yearInt={parseInt(year)}
				onMonthChange={onMonthChange}
				budget={budget}
				tasksQuantity={tasksQuantity}
			/>
			{days.map((day, i) => (
				<CalendarDay day={day} dayClick={dayClick} disabled={monthNum !== day.monthNum} key={i} />
			))}
		</section>
	);
};

Calendar.propTypes = {
	days: PropTypes.array.isRequired,
	selectedMonth: PropTypes.object.isRequired,
	tasksQuantity: PropTypes.number.isRequired,
	budget: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
	const { visibleDays, selectedMonth } = state.calendar;
	const { tasks, incomes, expenses } = state.items;

	const [ thisMonthTasks, thisMonthIncomes, thisMonthExpenses ] = [ tasks, incomes, expenses ].map((items) => {
		return items.length > 0 ? filterData(items, selectedMonth) : [];
	});

	const days = contactDaysToWeather(visibleDays, state.weather).map((e) => ({
		...e,
		containTasks: thisMonthTasks.length > 0 ? filterData(thisMonthTasks, e).length > 0 : false,
		containExpenses: thisMonthExpenses.length > 0 ? filterData(thisMonthExpenses, e).length > 0 : false,
		containIncomes: thisMonthIncomes.length > 0 ? filterData(thisMonthIncomes, e).length > 0 : false
	}));

	return {
		days,
		selectedMonth,
		tasksQuantity: thisMonthTasks.length,
		budget: getSumOfBudgetItems(thisMonthIncomes) - getSumOfBudgetItems(thisMonthExpenses)
	};
};

const mapDispatchToProps = (dispatch) => ({
	changeMonth: (diff) => dispatch(changeMonth(diff)),
	openCalendarModal: (selectedDay) => dispatch(toggleCalendarModal(true, selectedDay))
});
export default connect(mapStateToProps, mapDispatchToProps)(styleCalendar(Calendar));
