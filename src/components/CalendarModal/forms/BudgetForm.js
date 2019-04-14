import React from 'react';
import { Input, Button, Select, InputNumber } from 'antd';
import PropTypes from 'prop-types';

import { setInputColor } from './TaskForm';
import { Label, inputStyles, inputValueStyles, styleForm, selectStyles } from './styledForm';

const { Option } = Select;

const BudgetForm = ({setFormPropetyVal, addBudget, budgetTitle, budgetValue, budgetType, className}) => {
    const titleInputColor = setInputColor(budgetTitle.value, budgetTitle.valid, '');
    const valueInputColor = setInputColor(budgetValue.value, budgetValue.valid, null);
    
    const setTitle = (e) => {
		setFormPropetyVal('budgetForm', 'title', e.target.value);
	};

    const setType = (value) => {
		setFormPropetyVal('budgetForm', 'type', value);
    };
    
	const setValue = (value) => {
		setFormPropetyVal('budgetForm', 'value', value);
    };
    
	return (
		<form className={className}>
			<Label>
				Title
				<Input
					style={{
						...inputStyles,
						backgroundColor: titleInputColor
					}}
					onChange={setTitle}
					value={budgetTitle.value}
					size="small"
				/>
			</Label>
			<Label>
				Type
				<Select
					onChange={setType}
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
						backgroundColor: valueInputColor
					}}
					onChange={setValue}
					value={budgetValue.value}
					size="small"
				/>
			</Label>
			<Button onClick={addBudget} type="primary" size="small">
				Add
			</Button>
		</form>
	);
};

BudgetForm.propTypes = {
	setFormPropetyVal: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	addBudget: PropTypes.func.isRequired,
	budgetTitle: PropTypes.object.isRequired,
	budgetType: PropTypes.object.isRequired,
	budgetValue: PropTypes.object.isRequired,
}

export default styleForm(BudgetForm)

