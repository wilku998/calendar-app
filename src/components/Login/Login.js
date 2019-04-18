import React, { Component } from 'react';
import { Input, Radio, Button, Icon, message } from 'antd';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { firebase } from '../../database/firebase';
import setInputColor from '../../functions/setInputColor';
import { InputPassword, styleLogin, Label, Form } from './styledLogin';

const RadioGroup = Radio.Group;

class Login extends Component {
	state = {
		type: 'login',
		errorMessage: '',
		email: {
			value: '',
			valid: false
		},
		password: {
			value: '',
			valid: false
		},
		confirmPassword: {
			value: '',
			valid: false
		}
	};

	onRadioChange = (e) => {
		this.setState(() => ({
			type: e.target.value
		}));
	};

	login = async (email, password, type) => {
		try {
			if (type === 'register') {
				await firebase.auth().createUserWithEmailAndPassword(email, password);
			} else {
				await firebase.auth().signInWithEmailAndPassword(email, password);
			}
		} catch (error) {
			this.setState(() => ({
				errorMessage: error.message
			}));
		}
	};

	onSubmit = () => {
		const { type, email, password, confirmPassword } = this.state;
		if (email.valid && password.valid) {
			if (type === 'register' && confirmPassword.valid) {
				this.login(email.value, password.value, type);
			} else if (type === 'login') {
				this.login(email.value, password.value, type);
			}
		}
	};

	isValid = (property, value) => {
		switch (property) {
			case 'email':
				return validator.isEmail(value);
			case 'password':
				return value.length >= 6;
			case 'confirmPassword':
				return value.length >= 6 && value === this.state.password.value;
		}
	};

	setFormPropertyValue = (property, value) => {
		const valid = this.isValid(property, value);
		this.setState(() => ({
			[property]: {
				value,
				valid,
				color: setInputColor(value, valid, '')
			}
		}));
	};

	render() {
		const { className } = this.props;
		const { type, email, password, confirmPassword, errorMessage } = this.state;

		return (
			<div className={className}>
				<Link to="/">
					<Button type="primary">
						<Icon type="left" />Go back
					</Button>
				</Link>
				<Form>
					<Label>
						E-mail<Input
							style={{ backgroundColor: email.color }}
							value={email.value}
							onChange={(e) => this.setFormPropertyValue('email', e.target.value)}
						/>
					</Label>
					<Label>
						Password<InputPassword
							backgroundcolor={password.color}
							value={password.value}
							onChange={(e) => this.setFormPropertyValue('password', e.target.value)}
						/>
					</Label>
					{type === 'register' && (
						<Label>
							Confirm password<InputPassword
								backgroundcolor={confirmPassword.color}
								value={confirmPassword.value}
								onChange={(e) => this.setFormPropertyValue('confirmPassword', e.target.value)}
							/>
						</Label>
					)}

					<RadioGroup style={{ marginTop: '1rem' }} onChange={this.onRadioChange} value={type}>
						<Radio value="login">Login</Radio>
						<Radio value="register">Create an account</Radio>
					</RadioGroup>
					{errorMessage !== '' && <span>{errorMessage}</span>}
					<Button onClick={this.onSubmit} type="primary">
						submit
					</Button>
				</Form>
			</div>
		);
	}
}

export default styleLogin(Login);
