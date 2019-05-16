import React, { useState } from 'react';
import { Input, Radio, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'validator';

import { firebase } from '../../database/firebase';
import setInputColor from '../../functions/setInputColor';
import styleLogin, { InputPassword, Label, Form, LoginContent } from './styledLogin';

const RadioGroup = Radio.Group;

const Login = ({ className, mobileView, antdSize }) => {
	const [ type, setType ] = useState('login');
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ email, setEmail ] = useState({ value: '', valid: false });
	const [ password, setPassword ] = useState({ value: '', valid: false });
	const [ confirmPassword, setConfirmPassword ] = useState({ value: '', valid: false });

	const formValidation = (value, property) => {
		switch (property) {
			case 'email':
				return validator.isEmail(value);
			case 'password':
				return value.length >= 6;
			case 'confirmPassword':
				return value.length >= 6 && value === password.value;
		}
	};

	const createFormPropertyObject = (e, property) => {
		const value = e.target.value;
		const valid = formValidation(value, property);
		const inputColor = setInputColor(value, valid, '');
		return { value, valid, inputColor };
	};

	const onTypeChange = (e) => {
		setType(e.target.value);
	};

	const onEmailChange = (e) => {
		setEmail({
			...createFormPropertyObject(e, 'email')
		});
	};

	const onPasswordChange = (e) => {
		setPassword({
			...createFormPropertyObject(e, 'password')
		});
	};

	const onConfirmPasswordChange = (e) => {
		setConfirmPassword({
			...createFormPropertyObject(e, 'confirmPassword')
		});
	};

	const onSubmit = async () => {
		if (email.valid && password.valid) {
			try {
				if (confirmPassword.valid && type === 'register') {
					await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
				} else if (type === 'login') {
					await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
				}
			} catch (error) {
				setErrorMessage(error.message);
			}
		}
	};

	return (
		<div className={className}>
			<LoginContent mobileView={mobileView}>
				<Link to="/">
					<Button size={antdSize} type="primary">
						<Icon type="left" />Go back
					</Button>
				</Link>
				<Form>
					<Label>
						E-mail<Input
							style={{ backgroundColor: email.inputColor }}
							value={email.value}
							onChange={onEmailChange}
						/>
					</Label>
					<Label>
						Password<InputPassword
							backgroundcolor={password.inputColor}
							value={password.value}
							onChange={onPasswordChange}
						/>
					</Label>
					{type === 'register' && (
						<Label>
							Confirm password<InputPassword
								backgroundcolor={confirmPassword.inputColor}
								value={confirmPassword.value}
								onChange={onConfirmPasswordChange}
							/>
						</Label>
					)}
					<RadioGroup style={{ marginTop: '1rem' }} onChange={onTypeChange} value={type}>
						<Radio value="login">Login</Radio>
						<Radio value="register">Create an account</Radio>
					</RadioGroup>
					{errorMessage !== '' && <span>{errorMessage}</span>}
					<Button size={antdSize} onClick={onSubmit} type="primary">
						submit
					</Button>
				</Form>
			</LoginContent>
		</div>
	);
};

Login.propTypes = {
	className: PropTypes.string,
	mobileView: PropTypes.bool,
	antdSize: PropTypes.string
};

const mapStateToProps = ({ styles }) => {
	const { windowWidth } = styles;
	return {
		antdSize: windowWidth > 750 ? 'default' : 'small',
		mobileView: windowWidth <= 450
	};
};

export default connect(mapStateToProps)(styleLogin(Login));
