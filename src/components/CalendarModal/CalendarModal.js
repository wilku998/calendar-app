import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import { addItem } from '../../actions/items';
import filterData from '../../functions/filterData';
import { toggleModal } from '../../actions/modal';
import getMonthName from '../../functions/getMonthName';
import TaskForm from './forms/TaskForm';
import BudgetForm from './forms/BudgetForm';
import initialState from './initialState';
import List from './ModalList/ModalList';
import Weather from './Weather/Weather'
import {
	StyledModal,
	StyledModalContent,
	overlayStyles,
	CalendarModalItem,
	CalendarModalTitle,
	CalendarModalListContainer,
	CloseButton
} from './styledCalendarModal';

class CelandarModal extends Component {
	state = {
		...initialState
	};

	formValidation = (value, property) => {
		switch (property) {
			case 'title':
				return value.length >= 3 && value.length <= 30;
			case 'description':
				let wordsValid = true;
				value.split(' ').forEach((e) => {
					if (e.length > 20) {
						wordsValid = false;
					}
				});
				return value.length <= 400 && wordsValid;
			case 'value':
				return !isNaN(value) && value > 0 && value < 1000000;
			default:
				return true;
		}
	};

	setFormPropetyVal = (form, property, value) => {
		this.setState((state) => ({
			[form]: {
				...state[form],
				[property]: {
					value,
					valid: this.formValidation(value, property)
				}
			}
		}));
	};

	addItem = async (type, item) => {
		await this.props.addItem(type, {
			...item,
			createdAt: {
				...this.props.selectedDay
			}
		});

		this.setState(() => ({
			...initialState
		}));
	};

	addBudget = (e) => {
		e.preventDefault();
		const { title, type, value } = this.state.budgetForm;
		if (title.valid && value.valid) {
			this.addItem(`${type.value}s`, {
				title: title.value,
				value: Math.round(value.value * 100) / 100
			});
		}
	};

	addTask = (e) => {
		e.preventDefault();
		const { title, description } = this.state.taskForm;
		if (title.valid && description.valid) {
			this.addItem('tasks', {
				title: title.value,
				description: description.value
			});
		}
	};

	sliceArr = (arr) => {
		const half = Math.floor(arr.length / 2);
		return [ arr.slice(0, half), arr.slice(half) ];
	};
	onAfterOpen = () => {
		this.setState(() => ({
			...initialState
		}));
	};

	render() {
		const { modalIsOpen, closeModal, selectedDay, tasks, incomes, expenses } = this.props;
		const { description: taskDescription, title: taskTitle } = this.state.taskForm;
		const { value: budgetValue, title: budgetTitle, type: budgetType } = this.state.budgetForm;
		const { weather, dayNum, monthNum, year } = selectedDay;

		return (
			<StyledModal
				onAfterOpen={this.onAfterOpen}
				style={overlayStyles}
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				ariaHideApp={false}
			>
				<StyledModalContent>
					<CloseButton>
						<Icon type="close-circle" />
					</CloseButton>
					<CalendarModalItem>
						<div>
							<CalendarModalTitle withoutMargin={!weather}>
								{dayNum} {getMonthName(monthNum)} {year}
							</CalendarModalTitle>
							{weather && (
								<CalendarModalListContainer>
									{this.sliceArr(weather).map((e, i) => <Weather key={i} weather={e} />)}
								</CalendarModalListContainer>
							)}
						</div>
					</CalendarModalItem>

					<CalendarModalItem>
						<div>
							<CalendarModalTitle>Budget</CalendarModalTitle>
							<BudgetForm
								setFormPropetyVal={this.setFormPropetyVal}
								addBudget={this.addBudget}
								budgetTitle={budgetTitle}
								budgetValue={budgetValue}
								budgetType={budgetType}
							/>
							<CalendarModalListContainer>
								{incomes.length > 0 && <List title="Incomes" items={incomes} />}
								{expenses.length > 0 && <List title="Expenses" items={expenses} />}
							</CalendarModalListContainer>
						</div>
					</CalendarModalItem>

					<CalendarModalItem>
						<div>
							<CalendarModalTitle>Tasks</CalendarModalTitle>
							<TaskForm
								setFormPropetyVal={this.setFormPropetyVal}
								addTask={this.addTask}
								taskTitle={taskTitle}
								taskDescription={taskDescription}
							/>
							{tasks.length > 0 && <List items={tasks} title="Tasks" />}
						</div>
					</CalendarModalItem>
				</StyledModalContent>
			</StyledModal>
		);
	}
}

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
