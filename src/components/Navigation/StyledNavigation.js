import styled from 'styled-components';

export default (Navigation) => styled(Navigation)`
        width: 100%;
        padding: 1rem 2rem 1rem 0;
        background-color: ${(props) => props.theme.colorGreyDark3};
        display: flex;
        justify-content: space-between;
        align-items: center;
`;


export const ToggleButtonContainer = styled('div')`
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoginButtonContainer = styled('div')`
    padding-left: 2rem;
`;