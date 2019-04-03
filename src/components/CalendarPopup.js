import Modal from 'react-modal';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/database';
import filterDataForDay from '../functions/filterDataForDay';

class CelandarPopup extends Component {
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
		const { dayNum, monthNum, year } = this.props.selectedDay;
		this.props.addItem(type, {
			...this.state[form],
			createdAt: {
				dayNum,
				monthNum,
				year
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
		const { modalIsOpen, closeModal, selectedDay, tasks, incomes } = this.props;
		const { description: taskDescription, title: taskTitle } = this.state.taskForm;
		const { value: budgetValue, title: budgetTitle, type: budgetType } = this.state.budgetForm;
		const { weather } = selectedDay
		console.log(weather)
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
							<option>income</option>
							<option>exepense</option>
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
					{incomes.map((income, i) => <div key={`${income.title}-${i}`}>{income.title} {income.value}</div>)}
					{expenses.map((expense, i) => <div key={`${expense.title}-${i}`}>{expense.title} {expense.value}</div>)}
					{weather && weather.map((e, i) => (<div key={i}>{e.main.temp}℃ {e.dt_txt.split(' ')[1]}</div>))}
				</form>
			</Modal>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	addItem: (type, item) => dispatch(addItem(type, item))
});

const mapStateToProps = (state, props) => {
	const [ tasks, incomes, expenses ] = [ state.tasks, state.budget.incomes, state.budget.expenses ].map((e) =>
		filterDataForDay(e, props.selectedDay)
	);

	return {
		tasks,
		incomes,
		expenses
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CelandarPopup);
