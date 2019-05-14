import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import daysNames from '../../staticData/daysNames';
import { changeCalendarDate } from '../../actions/calendar';
import { toggleCalendarModal } from '../../actions/calendarModal';
import styleCalendar, { DayName, CalendarContainer, CalendarPaddingContainer } from './styledCalendar';
import CalendarSummary from './CalendarSummary/CalendarSummary';
import CalendarDay from './CalendarDay/CalendarDay';
import contactDaysToWeather from '../../functions/contactDaysToWeather';
import getSumOfBudgetItems from '../../functions/getSumOfBudgetItems';
import filterData from '../../functions/filterData';

const Calendar = ({
	days,
	budget,
	tasksQuantity,
	className,
	selectedMonth,
	openCalendarModal,
	changeCalendarDate,
	monthDiff,
	yearDiff,
}) => {
	const { monthNum } = selectedMonth;
	const containerRef = useRef();

	const dayClick = (day) => {
		const clikedMonthNumInt = parseInt(day.monthNum);
		const selectedMonthNumInt = parseInt(selectedMonth.monthNum);

		if (clikedMonthNumInt !== selectedMonthNumInt) {
			const diff = clikedMonthNumInt - selectedMonthNumInt;
			changeCalendarDate(monthDiff + diff, Math.abs(diff) === 11 ? yearDiff - Math.sign(diff) : yearDiff);
		} else {
			openCalendarModal(day);
		}
	};

	return (
		<CalendarContainer ref={containerRef}>
			<CalendarPaddingContainer>
				<section className={className}>
					<CalendarSummary
						selectedMonth={selectedMonth}
						onDateChange={changeCalendarDate}
						budget={budget}
						tasksQuantity={tasksQuantity}
					/>
					{daysNames.map((e, i) => <DayName key={i}>{e}</DayName>)}
					{days.map((day, i) => (
						<CalendarDay day={day} dayClick={dayClick} disabled={monthNum !== day.monthNum} key={i} />
					))}
				</section>
			</CalendarPaddingContainer>
		</CalendarContainer>
	);
};

Calendar.propTypes = {
	days: PropTypes.array.isRequired,
	selectedMonth: PropTypes.object.isRequired,
	tasksQuantity: PropTypes.number.isRequired,
	budget: PropTypes.number.isRequired,
	openCalendarModal: PropTypes.func.isRequired,
	changeCalendarDate: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	monthDiff: PropTypes.number.isRequired,
	yearDiff: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
	const { visibleDays, selectedMonth, monthDiff, yearDiff } = state.calendar;
	const { tasks, incomes, expenses } = state.items;

	const [ thisMonthTasks, thisMonthIncomes, thisMonthExpenses ] = [ tasks, incomes, expenses ].map((items) => {
		return items.length > 0 ? filterData(items, selectedMonth) : [];
	});

	const days = contactDaysToWeather(visibleDays, state.weather).map((e) => ({
		...e,
		containTasks: filterData(thisMonthTasks, e).length > 0,
		containExpenses: filterData(thisMonthExpenses, e).length > 0,
		containIncomes: filterData(thisMonthIncomes, e).length > 0
	}));

	return {
		days,
		selectedMonth,
		tasksQuantity: thisMonthTasks.length,
		budget: getSumOfBudgetItems(thisMonthIncomes) - getSumOfBudgetItems(thisMonthExpenses),
		monthDiff,
		yearDiff
	};
};

const mapDispatchToProps = (dispatch) => ({
	changeCalendarDate: (monthDiff, yearDiff) => dispatch(changeCalendarDate(monthDiff, yearDiff)),
	openCalendarModal: (selectedDay) => dispatch(toggleCalendarModal(true, selectedDay)),
});

export default connect(mapStateToProps, mapDispatchToProps)(styleCalendar(Calendar));
