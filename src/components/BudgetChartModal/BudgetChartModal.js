import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import now from '../../staticData/now';
import momentOperation from '../../functions/momentOperation';
import filterData from '../../functions/filterData';
import createChartPoints from './createChartPoints';
import TimePeroidForm from '../TimePeroidForm/TimePeroidForm';
import BudgetChart from './BudgetChart/BudgetChart';
import theme from '../../styledComponents/theme';
import styleModal from './styledBudgetChartModal';
import CloseButton from '../abstracts/CloseButton';

const BudgetChartModal = ({ closeModal, modalIsOpen, incomes, expenses, selectedMonth, className }) => {
	const [ timePeroid, setTimePeroid ] = useState(selectedMonth);

	const createTimePeroidObject = (monthValue, yearValue) => {
		const all = yearValue === 'all-years';
		if (all) {
			return {
				month: 'all-months',
				monthNum: 'all-months',
				year: yearValue
			};
		} else {
			const momentFunction = momentOperation(now.momentFunc, monthValue, yearValue);
			const allMonths = monthValue === 'all-months';
			return {
				month: allMonths ? monthValue : momentFunction.format('MMMM'),
				monthNum: allMonths ? monthValue : momentFunction.format('MM'),
				year: momentFunction.format('YYYY')
			};
		}
	};

	const onDateChange = (monthValue, yearValue) => {
		setTimePeroid(createTimePeroidObject(monthValue, yearValue));
	};

	const onAfterOpen = () => {
		setTimePeroid(selectedMonth);
	};

	const points = createChartPoints(filterData(incomes, timePeroid), filterData(expenses, timePeroid), timePeroid);
	return (
		<Modal
			ariaHideApp={false}
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			onAfterOpen={onAfterOpen}
			className={className}
			style={theme.modalOverlayStyles}
		>
			<CloseButton onClick={closeModal} marginright="2rem" />
			<TimePeroidForm timePeroid={timePeroid} onDateChange={onDateChange} optionAll={true} />
			<BudgetChart timePeroid={timePeroid} points={points} />
		</Modal>
	);
};

BudgetChartModal.propTypes = {
	closeModal: PropTypes.func.isRequired,
	modalIsOpen: PropTypes.bool.isRequired,
	incomes: PropTypes.array.isRequired,
	expenses: PropTypes.array.isRequired,
	selectedMonth: PropTypes.object.isRequired,
	className: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
	const { incomes, expenses } = state.items;
	return {
		incomes,
		expenses,
		selectedMonth: state.calendar.selectedMonth
	};
};

export default connect(mapStateToProps)(styleModal(BudgetChartModal));
