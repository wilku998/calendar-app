import styled from 'styled-components';
import { Input } from 'antd';
import media from '../../styledComponents/breakPoints';

export default (Login) => styled(Login)`
    width: 100%;
    height: 100vh;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InputPassword = styled(Input.Password)`
    & > input{
        background-color: ${(props) => props.backgroundcolor} !important;
    }
`;
export const LoginContent = styled('section')`
    background-color: ${(props) => props.theme.colorGreyLight3};
    padding: 2rem;
    width: 40rem;
    display: flex;
    flex-direction: column;
    border-radius: .3rem;
    
    ${media.small`
        width: 100%;
    `}
`;

export const Label = styled('label')`
    display: flex;
    flex-direction: column; 
`;

export const Form = styled('form')`
    display: flex;
    flex-direction: column;

    & > * {
        margin-top: 1rem;
    }
`;

export const ErrorMessage = styled.span`color: ${(props) => props.theme.colorRed};`;
