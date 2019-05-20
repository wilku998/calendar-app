import React, { useState } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import now from '../../staticData/now';
import momentOperation from '../../functions/momentOperation';
import filterData from '../../functions/filterData';
import createChartPoints from './createChartPoints';
import TimePeroidForm from '../TimePeroidForm/TimePeroidForm';
import BudgetChart from './BudgetChart/BudgetChart';
import theme from '../../styledComponents/theme';
import styleModal, { FormContainer } from './styledBudgetChartModal';

const BudgetChartModal = ({ closeModal, modalIsOpen, incomes, expenses, selectedMonth, className, antdInputsSize }) => {
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
			<FormContainer>
				<TimePeroidForm selectMargin='1rem 1.5rem 0 0' timePeroid={timePeroid} onDateChange={onDateChange} optionAll={true} />
				<Button style={{marginTop: '1rem'}} size={antdInputsSize} type="primary" onClick={closeModal}>
					Close
				</Button>
			</FormContainer>
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
	className: PropTypes.string.isRequired,
	antdInputsSize: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
	const { incomes, expenses } = state.items;
	return {
		incomes,
		expenses,
		selectedMonth: state.calendar.selectedMonth,
		antdInputsSize: state.styles.antdInputsSize
	};
};

export default connect(mapStateToProps)(styleModal(BudgetChartModal));
