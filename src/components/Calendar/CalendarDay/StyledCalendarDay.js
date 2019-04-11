import styled from 'styled-components';

export const styleCalendarDay = (CalendarDay) => {
	return styled(CalendarDay)`
        width: 10rem;
        height: 10rem;
        border-top: ${(props) => props.theme.darkBorder};
        border-left: ${(props) => props.theme.darkBorder};
        background: ${(props) => (props.disabled ? props.theme.colorGreyLight3 : props.theme.colorGreyLight1)};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 1.2rem;
        padding: 0.7rem;
        line-height: 1;
        position: relative;
    `;
};

export const CalendarDayInfo = styled.span`
	position: absolute;
	top: 0.7rem;
	left: 0.7rem;

	& > * {
		display: block;
		&:not(:last-child) {
			margin-bottom: 0.5rem;
		}
	}
`;

export const DayNum = styled.span`align-self: flex-end;`;

export const DayWeather = styled.div`
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	& > span {
		&:first-child {
			margin-bottom: 0.3rem;
		}
	}
`;

