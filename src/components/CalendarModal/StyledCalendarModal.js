import Modal from 'react-modal';
import styled from 'styled-components';
import { Icon } from 'antd';

export const overlayStyles = {
	overlay: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'rgba(0, 0, 0, .5)'
	}
};

export const inputStyles = {
	width: '15rem',
	display: 'inline-block',
	marginLeft: '1rem'
};

export const inputValueStyles = {
	...inputStyles,
	width: '7.5rem'
};

export const selectStyles = {
	display: 'inline-block',
	marginLeft: '1rem'
};

export const CloseButton = styled('button')`
	border: none;
	background: none;
	position: absolute;
	top: 2rem;
	right: 2rem;
	font-size: 1.8rem;
	cursor: pointer;
	transition: color .2s;
	&:hover{
		color: ${(props) => props.theme.colorBlue}
	}
	&:focus{
		outline: none;
	}
`;

export const CalendarModalItem = styled('div')`
	padding: 2rem 2rem 0 2rem;
	& > div {
		padding-bottom: 2rem;
	}
	&:not(:last-child){
		& > div {
			border-bottom: ${(props) => props.theme.darkBorder}
		}
	}

`;

export const CalendarModalTitle = styled('h1')`
	font-weight: 400;
	margin: ${(props) => (props.withoutMargin ? '0' : '0 0 1rem 0')};
`;

export const CalendarModalList = styled('ul')`
	list-style: none;
	flex: 1;
	margin-bottom: 0;
	&:not(:last-child){
		margin-right: 2rem;
	};
`;

export const CalendarModalListContainer = styled('div')`
	display: flex;
	width: 100%;
`;

export const StyledModal = styled(Modal)`
    background: ${(props) =>
		`linear-gradient(to right bottom, ${props.theme.colorGreyLight1}, ${props.theme.colorGreyLight2})`};
	border-radius: .3rem;
	box-shadow: 0 2rem 4rem rgba(0, 0, 0, .15);
`;

export const StyledModalContent = styled('div')`
	overflow-y: auto;
	max-height: 90vh;
	width: 70rem;
	position: relative;
`;

export const Label = styled('label')`
    margin-right: 1.5rem;
    display: flex;
	align-items: center;
	
	${(props) =>
		props.breakLine
			? `
			width: 100%;
			flex-direction: column;
			align-items: flex-start;
		`
			: ''}
`;

export const SpanLabelDescription = styled('span')`
	margin: 1rem 0;
`;
export const Form = styled('form')`
	display: flex;
	flex-wrap: wrap;
`;
