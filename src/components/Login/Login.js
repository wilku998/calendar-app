import React, { useState, useEffect } from 'react';
import { Input, Radio, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'validator';

import { firebase } from '../../database/firebase';
import setInputColor from '../../functions/setInputColor';
import styleLogin, { InputPassword, Label, Form, LoginContent, ErrorMessage } from './styledLogin';

const RadioGroup = Radio.Group;

const Login = ({ className, antdInputsSize }) => {
	const [ type, setType ] = useState('login');
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ email, setEmail ] = useState({ value: '', valid: false });
	const [ password, setPassword ] = useState({ value: '', valid: false });
	const [ confirmPassword, setConfirmPassword ] = useState({ value: '', valid: false });
	const setFunctions = { setEmail, setPassword, setConfirmPassword };

	const formValidation = (value, property) => {
		// eslint-disable-next-line default-case
		switch (property) {
			case 'email':
				return validator.isEmail(value);
			case 'password':
				return value.length >= 6;
			case 'confirmPassword':
				return value === password.value;
		}
	};

	const onFormChange = (value, name, action) => {
		const valid = formValidation(value, name);
		const inputColor = setInputColor(value, valid, '');
		setFunctions[action]({ value, valid, inputColor });
	};

	const onInputChange = ({ target }) => {
		const { value, name, dataset } = target;
		onFormChange(value, name, dataset.action);
	};

	const onTypeChange = (e) => {
		setType(e.target.value);
	};

	const onSubmit = async () => {
		let message;
		if (!email.valid) {
			message = 'Email is invalid.';
		} else if (!password.valid) {
			message = 'Password should have at least 6 characters.';
		} else {
			try {
				if (confirmPassword.valid && type === 'register') {
					await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
				} else if (type === 'login') {
					await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
				} else {
					message = 'Passwords have to be identical.';
				}
			} catch (error) {
				message = error.message;
			}
		}
		if (message) {
			setErrorMessage(message);
		}
	};

	useEffect(
		() => {
			if (type === 'register') {
				onFormChange(confirmPassword.value, 'confirmPassword', 'setConfirmPassword');
			}
		},
		[ password ]
	);

	return (
		<div className={className}>
			<LoginContent>
				<Link to="/">
					<Button size={antdInputsSize} type="primary">
						<Icon type="left" />
						Go back
					</Button>
				</Link>
				<Form>
					<Label>
						E-mail
						<Input
							data-action="setEmail"
							name="email"
							style={{ backgroundColor: email.inputColor }}
							value={email.value}
							onChange={onInputChange}
						/>
					</Label>
					<Label>
						Password
						<InputPassword
							data-action="setPassword"
							name="password"
							backgroundcolor={password.inputColor}
							value={password.value}
							onChange={onInputChange}
						/>
					</Label>
					{type === 'register' && (
						<Label>
							Confirm password
							<InputPassword
								data-action="setConfirmPassword"
								name="confirmPassword"
								backgroundcolor={confirmPassword.inputColor}
								value={confirmPassword.value}
								onChange={onInputChange}
							/>
						</Label>
					)}
					<RadioGroup style={{ marginTop: '1rem' }} onChange={onTypeChange} value={type}>
						<Radio value="login">Login</Radio>
						<Radio value="register">Create an account</Radio>
					</RadioGroup>
					{errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
					<Button size={antdInputsSize} onClick={onSubmit} type="primary">
						submit
					</Button>
				</Form>
			</LoginContent>
		</div>
	);
};

Login.propTypes = {
	className: PropTypes.string.isRequired,
	antdInputsSize: PropTypes.string.isRequired
};

const mapStateToProps = ({ styles }) => {
	const { antdInputsSize } = styles;
	return {
		antdInputsSize
	};
};

export default connect(mapStateToProps)(styleLogin(Login));
