import styled from 'styled-components';
import { Input } from 'antd';

export const InputPassword = styled(Input.Password)`
    & > input{
        background-color: ${(props) => props.backgroundcolor} !important;
    }
`;

export const styleLogin = (Login) => styled(Login)`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background-color: ${(props) => props.theme.colorGreyLight3};
    padding: 2rem;
    width: 40rem;
    display: flex;
    flex-direction: column;
    border-radius: .3rem;
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