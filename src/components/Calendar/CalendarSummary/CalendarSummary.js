import React, { useState } from 'react';
import PropTypes from 'prop-types';

import formatBudget from '../../../functions/formatBudget';
import TimePeroidForm from '../../TimePeroidForm/TimePeroidForm';
import BudgetChartModal from '../../BudgetChartModal/BudgetChartModal';
import styleSummary, { Item, ItemsContainer, BudgetItem } from './styledCalendarSummary';

const CalendarSummary = ({ className, onDateChange, budget, tasksQuantity, selectedMonth }) => {
	const [ budgetChartModalIsOpen, toggleBudgetChartModal ] = useState(false);

	const openBudgetChartModal = () => {
		toggleBudgetChartModal(true);
	};

	const closeBudgetChartModal = () => {
		toggleBudgetChartModal(false);
	};

	return (
		<div className={className}>
			<BudgetChartModal closeModal={closeBudgetChartModal} modalIsOpen={budgetChartModalIsOpen} />
			<TimePeroidForm timePeroid={selectedMonth} onDateChange={onDateChange} optionAll={false} />
			<ItemsContainer>
				<BudgetItem budget={budget >= 0 ? 'gain' : 'loss'} onClick={openBudgetChartModal}>
					Budget: <span>{formatBudget(budget)}</span>
				</BudgetItem>
				<Item>
					Tasks: <span>{tasksQuantity}</span>
				</Item>
			</ItemsContainer>
		</div>
	);
};

CalendarSummary.propTypes = {
	className: PropTypes.string.isRequired,
	onDateChange: PropTypes.func.isRequired,
	budget: PropTypes.number.isRequired,
	tasksQuantity: PropTypes.number.isRequired,
	selectedMonth: PropTypes.PropTypes.exact({
		days: PropTypes.arrayOf(PropTypes.object).isRequired,
		month: PropTypes.string.isRequired,
		monthNum: PropTypes.string.isRequired,
		year: PropTypes.string.isRequired,
		momentFunction: PropTypes.object.isRequired
	}).isRequired,
};

export default styleSummary(CalendarSummary);
