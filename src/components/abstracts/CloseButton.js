import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CloseButton = ({ onClick, className, marginright }) => (
	<button marginright={marginright} className={className} onClick={onClick}>
		<Icon type="close-circle" />
	</button>
);

CloseButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	marginright: PropTypes.string.isRequired
};

const style = (CloseButton) => styled(CloseButton)`
	position: absolute;
	cursor: pointer;
	top: 1.2rem;
	right: ${({ marginright }) => marginright};
	font-size: 2rem;
	background: none;
	border: none;
	transition: all .2s;

	&:focus{
		outline: none;
	}
	&:hover{
		color: ${({ theme }) => theme.colorBlue3}
	}
`;

export default style(CloseButton);
