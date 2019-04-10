import Modal from 'react-modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, InputNumber, Select, Button, Icon } from 'antd';

import theme from '../../styledComponentsTheme/styledComponentsTheme';
import { addItem } from '../../actions/items';
import filterData from '../../functions/filterData';
import { toggleModal } from '../../actions/modal';
import BudgetList from '../BudgetList/BudgetList';
import getMonthName from '../../functions/getMonthName';

import {
	StyledModal,
	StyledModalContent,
	inputStyles,
	selectStyles,
	overlayStyles,
	Label,
	Form,
	CalendarModalItem,
	CalendarModalTitle,
	CalendarModalList,
	CalendarModalListContainer,
	TaskTitle,
	SpanLabelDescription,
	CloseButton,
	inputValueStyles
} from './StyledCalendarModal';

const { Option } = Select;
const { TextArea } = Input;

class CelandarModal extends Component {
	state = {
		taskForm: {
			title: {
				value: '',
				valid: false
			},
			description: {
				value: '',
				valid: true
			}
		},
		budgetForm: {
			title: {
				value: '',
				valid: false
			},
			type: {
				value: 'income',
				valid: true
			},
			value: {
				value: '',
				valid: false
			}
		}
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

	addItem = (type, item) => {
		this.props.addItem(type, {
			...item,
			createdAt: {
				...this.props.selectedDay
			}
		});
	};

	addBudget = (e) => {
		e.preventDefault();
		const { title, type, value } = this.state.budgetForm;
		if (title.valid && value.valid) {
			console.log('passed');
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

	sliceArr(arr) {
		const half = Math.floor(arr.length / 2);
		return [ arr.slice(0, half), arr.slice(half) ];
	}
	render() {
		const { modalIsOpen, closeModal, selectedDay, tasks, incomes, expenses } = this.props;
		const { description: taskDescription, title: taskTitle } = this.state.taskForm;
		const { value: budgetValue, title: budgetTitle, type: budgetType } = this.state.budgetForm;
		const { weather, dayNum, monthNum, year } = selectedDay;

		return (
			<StyledModal style={overlayStyles} isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false}>
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
									{this.sliceArr(weather).map((arr, i) => (
										<CalendarModalList calendarList={true} key={i}>
											{arr.map((e, i) => (
												<li key={i}>
													<span>{e.main.temp}℃</span> <span>{e.dt_txt.split(' ')[1]}</span>
												</li>
											))}
										</CalendarModalList>
									))}
								</CalendarModalListContainer>
							)}
						</div>
					</CalendarModalItem>

					<CalendarModalItem>
						<div>
							<CalendarModalTitle>Budget</CalendarModalTitle>

							<Form>
								<Label>
									Title
									<Input
										style={{
											...inputStyles,
											backgroundColor:
												budgetTitle.value !== ''
													? budgetTitle.valid ? theme.colorGreenLight : theme.colorRedLight
													: 'white'
										}}
										onChange={(e) => this.setFormPropetyVal('budgetForm', 'title', e.target.value)}
										value={budgetTitle.value}
										size="small"
									/>
								</Label>
								<Label>
									Type
									<Select
										onChange={(value) => this.setFormPropetyVal('budgetForm', 'type', value)}
										value={budgetType.value}
										size="small"
										style={selectStyles}
									>
										<Option value="income">income</Option>
										<Option value="expense">expense</Option>
									</Select>
								</Label>
								<Label>
									Value
									<InputNumber
										style={{
											...inputValueStyles,
											backgroundColor:
												budgetValue.value !== ''
													? budgetValue.valid ? theme.colorGreenLight : theme.colorRedLight
													: 'white'
										}}
										onChange={(value) => this.setFormPropetyVal('budgetForm', 'value', value)}
										value={budgetValue.value}
										size="small"
									/>
								</Label>
								<Button onClick={this.addBudget} type="primary" size="small">
									Add
								</Button>
							</Form>

							<CalendarModalListContainer>
								{incomes.length > 0 && <BudgetList title="Incomes" items={incomes} />}
								{expenses.length > 0 && <BudgetList title="Expenses" items={expenses} />}
							</CalendarModalListContainer>
						</div>
					</CalendarModalItem>

					<CalendarModalItem>
						<div>
							<CalendarModalTitle>Tasks</CalendarModalTitle>

							<Form>
								<Label>
									Title
									<Input
										style={{
											...inputStyles,
											backgroundColor:
												taskTitle.value !== ''
													? taskTitle.valid ? theme.colorGreenLight : theme.colorRedLight
													: 'white'
										}}
										onChange={(e) => this.setFormPropetyVal('taskForm', 'title', e.target.value)}
										value={taskTitle.value}
										size="small"
									/>
								</Label>
								<Button type="primary" size="small" onClick={this.addTask}>
									Add
								</Button>
								<Label breakLine={true}>
									<SpanLabelDescription>Description</SpanLabelDescription>
									<TextArea
										rows={3}
										onChange={(e) =>
											this.setFormPropetyVal('taskForm', 'description', e.target.value)}
										value={taskDescription.value}
										style={{
											resize: 'none',
											backgroundColor:
												taskDescription.value !== ''
													? taskDescription.valid
														? theme.colorGreenLight
														: theme.colorRedLight
													: 'white'
										}}
									/>
								</Label>
							</Form>

							{tasks.length > 0 && (
								<CalendarModalList>
									{tasks.map((task, i) => (
										<li key={`${task.title}-${i}`}>
											<TaskTitle>{task.title}</TaskTitle>
											{task.description}
										</li>
									))}
								</CalendarModalList>
							)}
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

	const [ tasks, incomes, expenses ] = [state.items.tasks, state.items.incomes, state.items.expenses].map((e) =>
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
	task: PropTypes.array,
	incomes: PropTypes.array,
	expenses: PropTypes.array,
	selectedDay: PropTypes.object,
	modalIsOpen: PropTypes.bool,
	closeModal: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(CelandarModal);
