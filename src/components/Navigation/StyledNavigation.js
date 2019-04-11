import styled from 'styled-components';

export const ToggleButtonContainer = styled('div')`
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const styleNavigation = (Navigation) => {
	return styled(Navigation)`
        width: 100%;
        height: 5rem;
        background-color: red;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `
};
