import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Modal from 'react-modal';

import { addItem } from '../../actions/items';
import filterData from '../../functions/filterData';
import { toggleCalendarModal } from '../../actions/calendarModal';
import getMonthName from '../../functions/getMonthName';
import TaskForm from './forms/TaskForm';
import BudgetForm from './forms/BudgetForm';
import ItemsList from './lists/ItemsList/ItemsList';
import WeatherList from './lists/WeatherList';
import { ListContainer } from './lists/styledList';

import StyleModal, {
	ModalContent,
	overlayStyles,
	CalendarModalItem,
	CalendarModalTitle,
	CloseButton
} from './styledCalendarModal';

const CelandarModal = ({ modalIsOpen, closeModal, selectedDay, tasks, incomes, expenses, addItem, className }) => {
	const { weather, dayNum, monthNum, year } = selectedDay;
	const fullDate = `${dayNum} ${getMonthName(monthNum)} ${year}`;

	const createItem = async (type, item) => {
		await addItem(type, {
			...item,
			createdAt: {
				...selectedDay
			}
		});
	};

	return (
		<Modal
			className={className}
			style={overlayStyles}
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			ariaHideApp={false}
		>
			<ModalContent>
				<CloseButton onClick={closeModal}>
					<Icon type="close-circle" />
				</CloseButton>
				<CalendarModalItem>
					<CalendarModalTitle withoutMargin={!weather}>{fullDate}</CalendarModalTitle>
					{weather && <WeatherList weather={weather} />}
				</CalendarModalItem>

				<CalendarModalItem>
					<CalendarModalTitle>Budget</CalendarModalTitle>
					<BudgetForm createItem={createItem} />
					<ListContainer>
						{incomes.length > 0 && <ItemsList title="Incomes" items={incomes} />}
						{expenses.length > 0 && <ItemsList title="Expenses" items={expenses} />}
					</ListContainer>
				</CalendarModalItem>

				<CalendarModalItem>
					<CalendarModalTitle>Tasks</CalendarModalTitle>
					<TaskForm createItem={createItem} />
					{tasks.length > 0 && <ItemsList items={tasks} title="Tasks" />}
				</CalendarModalItem>
			</ModalContent>
		</Modal>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addItem: (type, item) => dispatch(addItem(type, item)),
	closeModal: () => dispatch(toggleCalendarModal(false))
});

const mapStateToProps = (state) => {
	const { modalIsOpen, selectedDay } = state.calendarModal;

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
export default StyleModal(connect(mapStateToProps, mapDispatchToProps)(CelandarModal));
