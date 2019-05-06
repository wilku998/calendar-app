import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import numeral from 'numeral';

import BudgetChartModal from '../../BudgetChartModal/BudgetChartModal';
import { monthsData } from '../../../staticData/months';
import styleSummary, { CalendarSummaryItem, CalendarSummarySelect } from './styledCalendarSummary';

const { Option } = Select;

const CalendarSummary = ({ className, onMonthChange, yearInt, monthInt, budget, tasksQuantity }) => {
	const [ budgetChartModalIsOpen, toggleBudgetChartModal ] = useState(true);

	const openBudgetChartModal = () => {
		toggleBudgetChartModal(true);
	};

	const closeBudgetChartModal = () => {
		toggleBudgetChartModal(false);
	};

	const years = [];
	for (let i = 0; i <= 10; i++) {
		years.push({
			year: yearInt + (i - 5),
			value: (i - 5) * 12
		});
	}

	const months = monthsData.map((e) => ({
		...e,
		value: e.value - monthInt
	}));

	return (
		<div className={className}>
			<BudgetChartModal closeModal={closeBudgetChartModal} modalIsOpen={budgetChartModalIsOpen} />
			<form>
				{[ { years, key: 'year' }, { months, key: 'month' } ].map((e) => (
					<CalendarSummarySelect as={Select} key={e.key} value={0} onChange={onMonthChange}>
						{e[`${e.key}s`].map((subElement) => (
							<Option key={subElement[e.key]} value={subElement.value}>
								{subElement[e.key]}
							</Option>
						))}
					</CalendarSummarySelect>
				))}
			</form>
			<div>
				<CalendarSummaryItem budget={budget >= 0 ? 'gain' : 'loss'} onClick={openBudgetChartModal}>
					Budget: <span>{numeral(budget).format('$0,0.00')}</span>
				</CalendarSummaryItem>
				<CalendarSummaryItem>
					Tasks: <span>{tasksQuantity}</span>
				</CalendarSummaryItem>
			</div>
		</div>
	);
};

CalendarSummary.propTypes = {
	className: PropTypes.string.isRequired,
	onMonthChange: PropTypes.func.isRequired,
	yearInt: PropTypes.number.isRequired,
	monthInt: PropTypes.number.isRequired,
	budget: PropTypes.number.isRequired,
	tasksQuantity: PropTypes.number.isRequired
};

export default styleSummary(CalendarSummary);
