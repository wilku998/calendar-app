import styled from 'styled-components';

import media from '../../../styledComponents/breakPoints';

export default (Summary) => styled(Summary)`
    width: 100%;
    font-size: 1.8rem;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    border-left: ${(props) => props.theme.darkBorder};
    background: ${(props) => `linear-gradient(to right bottom, ${props.theme.colorBlue1}, ${props.theme.colorBlue2})`};
		color: ${(props) => props.theme.colorGreyLight1}
		${media.mid`
			font-size: 2rem;
		`}
`;

export const Item = styled.span`
	padding: 0 11px;
	height: 100%;
	display: flex;
	align-items: center;
	& > span {
		margin-left: 0.5rem;
		color: ${(props) =>
			props.budget ? (props.budget === 'gain' ? props.theme.colorGreen : props.theme.colorRed) : 'inherit'};
		font-weight: 600;
	}
`;

export const BudgetItem = styled(Item)`
	position: relative;
	cursor: pointer;
	overflow: hidden;
	&:after {
		content: "";
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		width: 1px;
		height: 50%;
		background-color: rgba(0, 0, 0, .35);
		transition: all .2s;
	}

	&:before {
		content: "";
		position: absolute;
		top: 0%;
		left: 100%;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .05);
		transition: all .2s .2s;
	}

	&:hover:after{
		height: 100%;
	}

	&:hover:before{
		left: 0;
	}

`;

export const ItemsContainer = styled.div`
	background: white;
	display: flex;
	color: rgba(0, 0, 0, .65);
	border-radius: .5rem;
	border: 1px solid rgba(0, 0, 0, .35);
	font-size: 1.6rem;
`;
