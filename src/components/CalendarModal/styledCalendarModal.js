import styled from 'styled-components';

export default (Modal) => styled(Modal)`
	${({ theme }) => theme.modalStyles}
	width: 65rem;
	padding: 0 2rem;
`;

export const CalendarModalItem = styled('div')`
	padding: 2rem 0;
	&:not(:last-child){
		border-bottom: ${(props) => props.theme.lightBorder2}
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
