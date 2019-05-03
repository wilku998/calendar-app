import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

import styleForm, { Label, SpanLabelDescription, inputStyles, fontSize } from './styledForm';
import setInputColor from '../../../functions/setInputColor';
import formValidation from './validation';
import useTitle from './titleHook';
const { TextArea } = Input;

const TaskForm = ({ createItem, className }) => {
	console.log('tasks form rerender');
	const initialDescription = { value: '', valid: '', inputColor: 'white' };
	const [ description, setDescription ] = useState({ ...initialDescription });
	const [ title, setTitle, resetTitle ] = useTitle();

	const onDescriptionChange = (e) => {
		const value = e.target.value;
		const valid = formValidation(value, 'description');
		setDescription({ value, valid, inputColor: setInputColor(value, valid) });
	};

	const addTask = async () => {
		if (title.valid && description.valid) {
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
