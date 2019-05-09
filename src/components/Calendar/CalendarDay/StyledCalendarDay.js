import styled from 'styled-components';
import media from '../../../styledComponents/breakPoints';

export default (CalendarDay) => styled(CalendarDay)`
	${(props) => `
		border-top: ${props.theme.darkBorder};
		border-left: ${props.theme.darkBorder};
		background: ${props.disabled ? props.theme.colorGreyLight6 : props.theme.colorGreyLight3};
	`}
	flex: 1 14.2857%;
	cursor: pointer;
	position: relative;
	z-index: 1;
	&::after{
		content: "";
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(107, 164, 218, .25);
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
    justify-content: space-between;
	flex-wrap: wrap;
	align-items: flex-start;
	font-size: 1.4rem;
    padding: 1rem;
    line-height: 1;
	color: ${(props) => props.colorGreyDark3};
	
	${media.big`
    	padding: 0.7rem;
		font-size: 1.2rem;
	`};

	${media.mid`
		font-size: 1.4rem;
	`};
`;

export const CalendarDayInfo = styled.span`
	display: flex;
	flex-direction: column;
	& > i {
		&:not(:last-child) {
			margin-bottom: 0.5rem;
		}
	}
`;

export const DayNum = styled.span`
	font-size: 2rem;
	line-height: 1;
	margin-top: -.3rem;
`;

export const DayWeather = styled.div`
	flex: 1 100%;
	align-self: flex-end;
	display: flex;
	flex-direction: column;
	& > span {
		&:first-child {
			margin-bottom: 0.3rem;
		}
	}
`;
