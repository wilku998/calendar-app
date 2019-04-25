import styled from 'styled-components';

export const styleSummary = (Summary) => {
	return styled(Summary)`
        width: 100%;
        font-size: 1.6rem;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-left: ${(props) => props.theme.darkBorder};
        background: ${(props) =>
            `linear-gradient(to right bottom, ${props.theme.colorGreyLight2}, ${props.theme.colorGreyLight3})`
        };
    `;
};

export const CalendarSummaryItem = styled.span`
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`;