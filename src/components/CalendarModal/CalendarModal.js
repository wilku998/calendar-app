import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import { addItem } from '../../actions/items';
import filterData from '../../functions/filterData';
import { toggleModal } from '../../actions/modal';
import getMonthName from '../../functions/getMonthName';
import TaskForm from './forms/TaskForm';
import BudgetForm from './forms/BudgetForm';
import ItemsList from './ModalLists/ItemsList';
import WeatherList from './ModalLists/WeatherList';

import {
	StyledModal,
	StyledModalContent,
	overlayStyles,
	CalendarModalItem,
	CalendarModalTitle,
	CalendarModalListContainer,
	CloseButton
} from './styledCalendarModal';

const CelandarModal = ({ modalIsOpen, closeModal, selectedDay, tasks, incomes, expenses, addItem }) => {
	const { weather, dayNum, monthNum, year } = selectedDay;

	const createItem = async (type, item) => {
		await addItem(type, {
			...item,
			createdAt: {
				...selectedDay
			}
		});
	};

	return (
		<StyledModal style={overlayStyles} isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false}>
			<StyledModalContent>
				<CloseButton onClick={closeModal}>
					<Icon type="close-circle" />
				</CloseButton>
				<CalendarModalItem>
					<div>
						<CalendarModalTitle withoutMargin={!weather}>
							{dayNum} {getMonthName(monthNum)} {year}
						</CalendarModalTitle>
						{weather && <WeatherList weather={weather} />}
					</div>
				</CalendarModalItem>

				<CalendarModalItem>
					<div>
						<CalendarModalTitle>Budget</CalendarModalTitle>
						<BudgetForm createItem={createItem} />
						<CalendarModalListContainer>
							{incomes.length > 0 && <ItemsList title="Incomes" items={incomes} />}
							{expenses.length > 0 && <ItemsList title="Expenses" items={expenses} />}
						</CalendarModalListContainer>
					</div>
				</CalendarModalItem>

				<CalendarModalItem>
					<div>
						<CalendarModalTitle>Tasks</CalendarModalTitle>
						<TaskForm createItem={createItem} />
						{tasks.length > 0 && <ItemsList items={tasks} title="Tasks" />}
					</div>
				</CalendarModalItem>
			</StyledModalContent>
		</StyledModal>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addItem: (type, item) => dispatch(addItem(type, item)),
	closeModal: () => dispatch(toggleModal(false))
});

const mapStateToProps = (state) => {
	const { modalIsOpen, selectedDay } = state.modal;

	const [ tasks, incomes, expenses ] = [ state.items.tasks, state.items.incomes, state.items.expenses ].map((e) =>
		filterData(e, selectedDay)
	);

	return {
		modalIsOpen,
		selectedDay,
		tasks,
		incomes,
		expenses
	};
};

CelandarModal.propTypes = {
	tasks: PropTypes.array.isRequired,
	incomes: PropTypes.array.isRequired,
	expenses: PropTypes.array.isRequired,
	selectedDay: PropTypes.object.isRequired,
	modalIsOpen: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(CelandarModal);
