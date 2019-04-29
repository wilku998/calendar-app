import styled from 'styled-components';

export const styleSummary = (Summary) => {
	return styled(Summary)`
        width: 100%;
        font-size: 1.8rem;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-left: ${(props) => props.theme.darkBorder};
        background: ${(props) =>
			`linear-gradient(to right bottom, ${props.theme.colorGreyLight4}, ${props.theme.colorGreyLight5})`};
    `;
};

export const CalendarSummaryItem = styled.span`
	&:not(:last-child) {
		margin-right: 1.5rem;
	}

	& > span {
		color: ${(props) =>
			props.budget ? (props.budget === 'gain' ? props.theme.colorGreen : props.theme.colorRed) : 'inherit'};
		font-weight: 600;
	}
`;

export const CalendarSummarySelect = styled.select`
	width: 15rem;
	&:not(:last-child) {
		margin-right: 1.5rem;
	}
	font-size: 1.6rem;
`;
