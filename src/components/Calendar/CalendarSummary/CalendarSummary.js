import React, { useState } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

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
					Budget: <span>{numeral(budget).format('$0,0.00')}</span>
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
	selectedMonth: PropTypes.object.isRequired
};

export default styleSummary(CalendarSummary);
