import styled from 'styled-components';

export default (Modal) => styled(Modal)`
	${({ theme }) => theme.modalStyles};
	position: relative;
	padding: 1rem 2rem 2rem 2rem;
	border-radius: 0.3rem;
`;

export const ChartContainer = styled.div`
	margin-top: 3rem;
	display: flex;
	flex-direction: column;
	width: 50rem;
	height: 50rem;
	max-height: 100%; 
	max-width: 100%; 
`;

export const FormContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
