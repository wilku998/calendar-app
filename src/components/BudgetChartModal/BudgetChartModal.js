import React, { useLayoutEffect, useRef } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import BudgetChart from './BudgetChart';
import createChartPoints from '../../functions/createChartPoints';
import overlayStyles from '../CalendarModal/styledCalendarModal';

const BudgetChartModal = ({ closeModal, modalIsOpen, points }) => {
	console.log(points);

	return (
		<Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} style={{ ...overlayStyles }}>
			<BudgetChart />
		</Modal>
	);
};

const mapStateToProps = (state) => {
	const { incomes, expenses } = state.items;
	return {
		points: createChartPoints(incomes, expenses)
	};
};
export default connect(mapStateToProps)(BudgetChartModal);
