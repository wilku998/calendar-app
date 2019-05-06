import styled from 'styled-components';
import media from '../../../styledComponents/breakPoints';

export default (CalendarDay) => styled(CalendarDay)`
	${(props) => `
		border-top: ${props.theme.darkBorder};
		border-left: ${props.theme.darkBorder};
		background: ${props.disabled ? props.theme.colorGreyLight5 : props.theme.colorGreyLight3};
	`}
	flex: 1 14.2857%;
	cursor: pointer;
	position: relative;

	&::after{
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0,0,0,.025);
		opacity: 0;
		transition: all .2s;
	}

	&:hover:after{
		opacity: 1;
	}
`;

export const StyledDayPadding = styled('div')`
	padding-top: 100%;
	position: relative;
`;

export const StyledDayContent = styled('div')`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1.6rem;
    padding: 1rem;
    line-height: 1;
	color: ${props => props.colorGreyDark3};

	${media.big`
    	padding: 0.7rem;
		font-size: 1.2rem;
	`};

	${media.mid`
		font-size: 1.4rem;
	`};
`;

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
