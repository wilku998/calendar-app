import Modal from 'react-modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, InputNumber, Select, Button, Icon } from 'antd';

import { addItem } from '../../actions/database';
import filterData from '../../functions/filterData';
import { toggleModal } from '../../actions/modal';
import BudgetList from '../BudgetList/BudgetList';

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
			title: '',
			description: ''
		},
		budgetForm: {
			title: '',
			type: 'income',
			value: 0
		}
	};

	setFormPropetyVal = (form, property, val) => {
		this.setState((state) => ({
			[form]: {
				...state[form],
				[property]: val
			}
		}));
	};

	addItem = (type, form) => {
		this.props.addItem(type, {
			...this.state[form],
			createdAt: {
				...this.props.selectedDay
			}
		});
	};

	addBudget = (e) => {
		e.preventDefault();
		this.addItem(`${this.state.budgetForm.type}s`, 'budgetForm');
	};

	addTask = (e) => {
		e.preventDefault();
		this.addItem('tasks', 'taskForm');
	};

	sliceArr(arr) {
		const half = Math.floor(arr.length / 2);
		return [ arr.slice(0, half), arr.slice(half) ];
	}
	render() {
		const { modalIsOpen, closeModal, selectedDay, tasks, incomes, expenses } = this.props;
		const { description: taskDescription, title: taskTitle } = this.state.taskForm;
		const { value: budgetValue, title: budgetTitle, type: budgetType } = this.state.budgetForm;
		const { weather } = selectedDay;
		return (
			<StyledModal style={overlayStyles} isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false}>
				<StyledModalContent>
					<CloseButton><Icon type="close-circle" /></CloseButton>
						<CalendarModalItem>
							<div>
								<CalendarModalTitle withoutMargin={!weather}>Weather</CalendarModalTitle>
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
							<Form onSubmit={this.addBudget}>
								<Label>
									Title
									<Input
										style={inputStyles}
										onChange={(e) => this.setFormPropetyVal('budgetForm', 'title', e.target.value)}
										value={budgetTitle}
										size="small"
									/>
								</Label>
								<Label>
									Type
									<Select
										onChange={(value) => this.setFormPropetyVal('budgetForm', 'type', value)}
										value={budgetType}
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
										style={inputValueStyles}
										onChange={(value) => this.setFormPropetyVal('budgetForm', 'value', value)}
										value={budgetValue}
										size="small"
									/>
								</Label>
								<Button type="primary" size="small">Add</Button>
							</Form>

							<CalendarModalListContainer>
								{incomes.length > 0 && <BudgetList title='Incomes' items={incomes}/>}

								{expenses.length > 0 && <BudgetList title='Expenses' items={expenses}/>}
							</CalendarModalListContainer>
						</div>
					</CalendarModalItem>

					<CalendarModalItem>
						<div>
							<CalendarModalTitle>Tasks</CalendarModalTitle>
							<Form onSubmit={this.addTask}>
								<Label>
									Title
									<Input
										style={inputStyles}
										onChange={(e) => this.setFormPropetyVal('taskForm', 'title', e.target.value)}
										value={taskTitle}
										size="small"
									/>
								</Label>
								<Button type="primary" size="small">Add</Button>

								<Label breakLine={true}>
									<SpanLabelDescription>Description</SpanLabelDescription>
									<TextArea placeholder="Autosize height with minimum and maximum number of lines"
										style={{resize: 'none'}}
										rows={3}
										onChange={(e) => this.setFormPropetyVal('taskForm', 'description', e.target.value)}
										value={taskDescription}
									/>
								</Label>
							</Form>
							{tasks.length > 0 && (
								<CalendarModalList>
									{tasks.map((task, i) => <li key={`${task.title}-${i}`}>
										<li>
										<TaskTitle>{task.title}</TaskTitle>
											{task.description}
										</li>
									</li>)}
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
	const [ tasks, incomes, expenses ] = [ state.tasks, state.budget.incomes, state.budget.expenses ].map((e) =>
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
