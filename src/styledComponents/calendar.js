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
	justify-content: space-between;
	font-size: 1.2rem;
	padding: .7rem;
	line-height: 1;
`;
export const DayNum = styled.span`
	align-self: flex-end;
`;

export const DayWeather = styled.div`
	aling-self: flex-start;
	display: flex;
	flex-direction: column;
	 
	& > span {
		&:first-child{
			margin-bottom: .3rem;
		}
	}
`;

export const DayWeatherImage = styled.img`
	height: 2.5rem;
	width: 2.5rem;
	margin-left: -.5rem;
`
export const CalendarSummary = styled.div`
	width: 70.1rem;
	font-size: 1.6rem;
`;
