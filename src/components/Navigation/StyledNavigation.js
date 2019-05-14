import styled from 'styled-components';
import media from '../../styledComponents/breakPoints';

export default (Navigation) => styled(Navigation)`
    width: 100%;
    padding: 1rem 2rem 1rem 0;    
    background-color: ${(props) => props.theme.colorGreyDark3};
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${media.big`
    `}
    
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

export const Logo = styled.h1`
	font-size: 2.2rem;
	margin-bottom: 0;
	width: 25rem;
    text-align: center;
    letter-spacing: .05rem;
	${({ theme }) => `
        color: ${theme.colorGreyLight2};
        border-right: ${theme.darkBorder};

        @supports(
            (-webkit-background-clip: text) and
            (-webkit-text-fill-color: transparent)
        ) {
            background: linear-gradient(to right bottom, ${theme.colorGreyLight3}, ${theme.colorGreyLight5});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    `};
`;
