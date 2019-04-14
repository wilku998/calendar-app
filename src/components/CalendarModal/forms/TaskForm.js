import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

import { styleForm, Label, SpanLabelDescription, inputStyles } from './styledForm';
import theme from '../../../styledComponentsTheme/styledComponentsTheme';


const { TextArea } = Input;

export const setInputColor = (value, valid, validator) => {
	return value !== validator ? (valid ? theme.colorGreenLight : theme.colorRedLight) : 'white';
};

const TaskForm = ({ setFormPropetyVal, addTask, taskDescription, taskTitle, className }) => {
	const titleInputColor = setInputColor(taskTitle.value, taskTitle.valid, '');
	const descriptionInputColor = setInputColor(taskDescription.value, taskDescription.valid, '');

	const setTitle = (e) => {
		setFormPropetyVal('taskForm', 'title', e.target.value);
	};

	const setDescription = (e) => {
		setFormPropetyVal('taskForm', 'description', e.target.value);
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
					value={taskTitle.value}
					size="small"
				/>
			</Label>
			<Button type="primary" size="small" onClick={addTask}>
				Add
			</Button>
			<Label breakLine={true}>
				<SpanLabelDescription>Description</SpanLabelDescription>
				<TextArea
					rows={3}
					onChange={setDescription}
					value={taskDescription.value}
					style={{
						resize: 'none',
						backgroundColor: descriptionInputColor
					}}
				/>
			</Label>
		</form>
	);
};

TaskForm.propTypes = {
	setFormPropetyVal: PropTypes.func.isRequired,
	addTask: PropTypes.func.isRequired,
	taskDescription: PropTypes.object.isRequired,
	taskTitle: PropTypes.object.isRequired,
	className: PropTypes.string.isRequired,
}

export default styleForm(TaskForm)