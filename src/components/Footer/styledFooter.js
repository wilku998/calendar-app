import styled from 'styled-components';
import media from '../../styledComponents/breakPoints';

export default styled.footer`
	display: flex;
	z-index: -1;
	font-size: 1.4rem;

	${media.mid`
		flex-direction: column;
	`}

	${(props) => `
        background: linear-gradient(to right bottom, ${props.theme.colorGreyDark4}, ${props.theme.colorGreyDark1});
		color: ${props.theme.colorGreyLight1};
		padding: 4rem calc(2rem + ${props.scrollbarwidth}px) 4rem 2rem;	
		${props.fake
			? 'opacity: 0;'
			: `position: fixed;
			bottom: 0;`}
    `};
`;

export const List = styled.ul`
	flex: 0 50%;
	list-style: none;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	text-align: ${(props) => props.textAlign};
	margin-bottom: 0;

	&:not(:last-child) {
		margin-right: 4rem;

		${media.mid`
			margin-right: 0;
			margin-bottom: 4rem;
		`}
	}



	& > li {
		&:not(:first-child) {
			margin-top: 2rem;
		}
	}
`;

export const ListTitle = styled.h3`
	text-align: ${(props) => props.textAlign};
	font-size: 1.8rem;
	margin-bottom: .3rem;
	padding-bottom: .3rem;
	font-weight: 400;
	${({ theme }) => `
        color: ${theme.colorGreyLight4};
        border-bottom: ${theme.darkBorder}
    `};
`;
