import Modal from 'react-modal';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../actions/database';
import filterData from '../functions/filterData';
import { toggleModal } from '../actions/modal';

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

	render() {
		const { modalIsOpen, closeModal, selectedDay, tasks, incomes, expenses } = this.props;
		const { description: taskDescription, title: taskTitle } = this.state.taskForm;
		const { value: budgetValue, title: budgetTitle, type: budgetType } = this.state.budgetForm;
		const { weather } = selectedDay;
		return (
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false}>
				<form onSubmit={this.addBudget}>
					<label>
						Title
						<input
							onChange={(e) => this.setFormPropetyVal('budgetForm', 'title', e.target.value)}
							value={budgetTitle}
							type="text"
						/>
					</label>
					<label>
						Type
						<select
							onChange={(e) => this.setFormPropetyVal('budgetForm', 'type', e.target.value)}
							value={budgetType}
						>
							<option value="income">income</option>
							<option value="expense">exepense</option>
						</select>
					</label>
					<label>
						value
						<input
							onChange={(e) => this.setFormPropetyVal('budgetForm', 'value', e.target.value)}
							value={budgetValue}
							type="text"
						/>
					</label>
					<button>Add</button>
				</form>
				<form onSubmit={this.addTask}>
					<label>
						Title
						<input
							type="text"
							onChange={(e) => this.setFormPropetyVal('taskForm', 'title', e.target.value)}
							value={taskTitle}
						/>
					</label>
					<label>
						Description
						<input
							type="textarea"
							onChange={(e) => this.setFormPropetyVal('taskForm', 'description', e.target.value)}
							value={taskDescription}
						/>
					</label>
					<button>Add</button>
					{tasks.map((task, i) => <div key={`${task.title}-${i}`}>{task.title}</div>)}
					{incomes.map((income, i) => (
						<div key={`${income.title}-${i}`}>
							{income.title} {income.value}
						</div>
					))}
					{expenses.map((expense, i) => (
						<div key={`${expense.title}-${i}`}>
							{expense.title} {expense.value}
						</div>
					))}
					{weather &&
						weather.map((e, i) => (
							<div key={i}>
								{e.main.temp}℃ {e.dt_txt.split(' ')[1]}
							</div>
						))}
				</form>
			</Modal>
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
