import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, message } from 'antd';

import styleForm, { Label, SpanLabelDescription, inputStyles, fontSize } from './styledForm';
import setInputColor from '../../../functions/setInputColor';
import formValidation from './validation';
import useTitle from './titleHook';

const { TextArea } = Input;

const TaskForm = ({ createItem, className }) => {
	const initialDescription = { value: '', valid: true, inputColor: 'white' };
	const [ description, setDescription ] = useState({ ...initialDescription });
	const [ title, setTitle, resetTitle ] = useTitle();

	const onDescriptionChange = (e) => {
		const value = e.target.value;
		const valid = formValidation(value, 'description');
		setDescription({ value, valid, inputColor: setInputColor(value, valid, '') });
	};

	const addTask = async () => {
		if (!title.valid) {
			message.warning('Title should have at least 3 characters and less than 21.');
		} else if (!description.valid) {
			message.warning('Description length can\'t be greater than 400 characters and maximum word length is 20.');
		} else {
			await createItem('tasks', {
				title: title.value,
				description: description.value
			});
			setDescription({ ...initialDescription });
			resetTitle();
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
			<Button style={{ ...fontSize, marginTop: '1rem' }} type="primary" size="small" onClick={addTask}>
				Add
			</Button>
			<Label breakLine={true}>
				<SpanLabelDescription>Description</SpanLabelDescription>
				<TextArea
					rows={3}
					onChange={onDescriptionChange}
					value={description.value}
					style={{
						...fontSize,
						resize: 'none',
						backgroundColor: description.inputColor
					}}
				/>
			</Label>
		</form>
	);
};

TaskForm.propTypes = {
	createItem: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired
};

export default styleForm(TaskForm);
