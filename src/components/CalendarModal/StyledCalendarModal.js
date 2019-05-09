import styled from 'styled-components';
import { Button } from 'antd';

import media from '../../styledComponents/breakPoints';

export default (Modal) => styled(Modal)`
  background: ${(props) =>
		`linear-gradient(to right bottom, ${props.theme.colorGreyLight1}, ${props.theme.colorGreyLight2})`};
	border-radius: .3rem;
	box-shadow: 0 2rem 4rem rgba(0, 0, 0, .15);
	width: 65rem;
	position: relative;
	padding: 0 2rem;
	max-height: 100%;
	overflow: auto;
	${media.mid`
			width: 100%;
	`}
`;

export const overlayStyles = {
	overlay: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'rgba(0, 0, 0, .5)',
		padding: '2rem',
		zIndex: 10
	}
};

export const CloseButton = styled(Button)`
	position: absolute !important;
	top: 2rem;
	right: 0;

`;

export const CalendarModalItem = styled('div')`
	padding: 2rem 0;

	&:not(:last-child){
			border-bottom: ${(props) => props.theme.darkBorder}
	}

`;

export const CalendarModalTitle = styled('h1')`
	line-height: 1;
	font-weight: 400;
	margin: ${(props) => (props.withoutMargin ? '0' : '0 0 1rem 0')};
	font-size: ${(props) => (props.mainTitle ? '3rem' : '2.4rem')};
`;

export const ModalContent = styled('div')`
	position: relative;

	::-webkit-scrollbar { 
    	display: none; 
	}
`;
