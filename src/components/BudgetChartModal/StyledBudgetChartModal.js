import styled from 'styled-components';

export default (Modal) => styled(Modal)`
	position: relative;
	padding: 2rem;
	border-radius: 0.3rem;
	${({ theme }) => theme.modalStyles}

`;

export const ChartContainer = styled.div`
	margin-top: 2rem;
	display: flex;
	flex-direction: column;
	width: 50rem;
	height: 50rem;
`;
