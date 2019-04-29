import { useState } from 'react';
import formValidation from './validation';
import setInputColor from '../../../functions/setInputColor';

export default () => {
	const initialState = { value: '', valid: '', inputColor: 'inherit' };
	const [ title, setTitle ] = useState({ ...initialState });

	const onTitleChange = (e) => {
		const value = e.target.value;
		const valid = formValidation(value, 'title');
		setTitle({ value, valid, inputColor: setInputColor(value, valid) });
	};

	const resetTitle = () => {
		setTitle({ ...initialState });
	};

	return [ title, onTitleChange, resetTitle ];
};
