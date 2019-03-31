import styled from 'styled-components';

export const CalendarContainer = styled.div`
	width: 70.1rem;
	display: flex;
	flex-wrap: wrap;
	border-bottom: 1px solid black;
	border-right: 1px solid black;
	border-top: 1px solid black;
`;
export const CalendarDay = styled.div`
	width: 10rem;
	height: 10rem;
	border-top: 1px solid black;
	border-left: 1px solid black;
	background-color: ${(props) => (props.disabled ? 'grey' : 'white')};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 1.2rem;
	position: relative;
`;
export const DayNum = styled.span`
	font-size: 3rem;
	line-height: 1;
`;

export const DayWheather = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	padding: .5rem;
	display: flex;
	justify-content: space-between;
	width: 100%;

	& > img {
		height: 2.5rem;
		width: 2.5rem;
	}
`;
export const CalendarSummary = styled.div`
	width: 70.1rem;
	font-size: 1.6rem;
`;
