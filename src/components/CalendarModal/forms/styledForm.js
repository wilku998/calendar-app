import styled from 'styled-components';
import media from '../../../styledComponents/breakPoints';

export default (Form) => styled(Form)`
	display: flex;
	flex-wrap: wrap;
`;

export const fontSize = { fontSize: '1.4rem' };

export const Label = styled('label')`
    margin: 1rem 1.5rem 0 0;
    display: flex;
	align-items: center;
	
	${(props) => (props.breakLine ? `
		width: 100%;
		flex-direction: column;
		align-items: flex-start;
	` : '')}
`;

export const SpanLabelDescription = styled('span')`
	margin: 1rem 0;
`;

export const inputStyles = {
	width: '15rem',
	display: 'inline-block',
	marginLeft: '1rem'
};

export const inputValueStyles = {
	...inputStyles,
	width: '7.5rem'
};

export const selectStyles = {
	display: 'inline-block',
	marginLeft: '1rem'
};
