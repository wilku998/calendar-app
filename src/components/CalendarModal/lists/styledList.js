import styled from 'styled-components';
import media from '../../../styledComponents/breakPoints';

export const ListContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

export const List = styled.ul`
	flex: 1;
	margin: ${(props) => (props.marginTop ? '2rem 0 0 0' : 0)};
	&:not(:last-child) {
		margin-right: 2rem;
	}
	${media.small`
        flex: 1 100%;
        &:not(:last-child) {
			margin-right: 0;
	    }
    `}
`;

export const ListItem = styled.li`
	padding: ${({ padding }) => (padding === 'big' ? '1rem' : '0.5rem')} 0;
	display: flex;
	justify-content: space-between;
	aling-items: center;
	flex-wrap: wrap;
	&:not(:last-child) {
		${(props) => `
        border-bottom: ${props.theme.lightBorder}
    `};
	}
`;

export const ListItemTitle = styled.h3`
	font-size: 1.4rem;
	font-weight: 400;
	display: flex;
	align-items: center;
	margin-bottom: 0;
`;

export const RemoveButton = styled.button`
	background: none;
	border: none;
	margin-right: 1rem;
	&:focus {
		outline: none;
	}
`;

export const TaskDescription = styled.span`
	flex: 1 100%;
	margin-top: .5rem;
`;
