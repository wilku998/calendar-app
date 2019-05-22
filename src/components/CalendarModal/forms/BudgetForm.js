import React, { useState } from 'react';
import { Input, Button, Select, InputNumber, message } from 'antd';
import PropTypes from 'prop-types';

import styleForm, { Label, inputStyles, inputValueStyles, selectStyles, fontSize } from './styledForm';
import setInputColor from '../../../functions/setInputColor';
import useTitle from './titleHook';
import formValidation from './validation';

const { Option } = Select;

const BudgetForm = ({ createItem, className }) => {
	const [ type, setType ] = useState('income');
	const [ value, setValue ] = useState({ value: null, valid: true, inputColor: 'white' });
	const [ title, setTitle, resetTitle ] = useTitle();

	const onValueChange = (value) => {
		const valid = formValidation(value, 'value');
		setValue({
			value,
			valid,
			inputColor: setInputColor(value, valid, null)
		});
	};

	const onTypeChange = (type) => setType(type);

	const addBudget = async () => {
		if (!title.valid) {
			message.warning('Title should have at least 3 characters and less than 21.');
		} else if (!value.valid) {
			message.warning('The value must be a number greater than 0 and less than 1,000,000.');
		} else {
			await createItem(`${type}s`, {
				title: title.value,
				value: Math.round(value.value * 100) / 100
			});
			onValueChange(null);
			resetTitle();
			setType('income');
		}
	};

	return (
		<form className={className}>
			<Label>
				Title
				<Input
					style={{
						...fontSize,
						...inputStyles,
						backgroundColor: title.inputColor
					}}
					onChange={setTitle}
					value={title.value}
					size="small"
				/>
			</Label>
			<Label>
				Type
				<Select onChange={onTypeChange} value={type} size="small" style={{ ...fontSize, ...selectStyles }}>
					<Option value="income">income</Option>
					<Option value="expense">expense</Option>
				</Select>
			</Label>
			<Label>
				Value
				<InputNumber
					style={{
						...fontSize,
						...inputValueStyles,
						backgroundColor: value.inputColor
					}}
					onChange={onValueChange}
					value={value.value}
					size="small"
				/>
			</Label>
			<Button style={{ ...fontSize, marginTop: '1rem' }} onClick={addBudget} type="primary" size="small">
				Add
			</Button>
		</form>
	);
};

BudgetForm.propTypes = {
	className: PropTypes.string.isRequired,
	createItem: PropTypes.func.isRequired
};

export default styleForm(BudgetForm);
