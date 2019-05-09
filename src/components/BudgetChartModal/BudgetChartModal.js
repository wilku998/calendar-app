import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import now from '../../staticData/now';
import momentOperation from '../../functions/momentOperation';
import filterData from '../../functions/filterData';
import createChartPoints from '../../functions/createChartPoints';
import TimePeroidForm from '../TimePeroidForm/TimePeroidForm';
import BudgetChart from './BudgetChart';
import { overlayStyles } from '../CalendarModal/styledCalendarModal';
import { contentStyles } from './StyledBudgetChartModal';

const BudgetChartModal = ({ closeModal, modalIsOpen, incomes, expenses, selectedMonth }) => {
	const [ timePeroid, setTimePeroid ] = useState(selectedMonth);
	
	const createTimePeroidObject = (momentFunction) => {
		return {
			month: momentFunction.format('MMMM'),
			monthNum: momentFunction.format('MM'),
			year: momentFunction.format('YYYY')
		};
	};

	const onDateChange = (monthValue, yearValue) => {
		setTimePeroid(createTimePeroidObject(momentOperation(now.momentFunc, monthValue, yearValue)));
	};

	const onAfterOpen = () => {
		setTimePeroid(selectedMonth)
	};

	return (
		<Modal
			ariaHideApp={false}
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={{ ...overlayStyles, ...contentStyles }}
			onAfterOpen={onAfterOpen}
		>
			<TimePeroidForm timePeroid={timePeroid} onDateChange={onDateChange} optionAll={true} />
			<BudgetChart
				points={createChartPoints(filterData(incomes, timePeroid), filterData(expenses, timePeroid))}
			/>
		</Modal>
	);
};

const mapStateToProps = (state) => {
	const { incomes, expenses } = state.items;
	return {
		incomes,
		expenses,
		selectedMonth: state.calendar.selectedMonth
	};
};

export default connect(mapStateToProps)(BudgetChartModal);
