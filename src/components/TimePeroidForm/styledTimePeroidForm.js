import { Select } from 'antd';
import styled from 'styled-components';

export const StyledSelect = styled(Select)`
	width: 12rem;
	&:not(:last-child) {
		margin-right: 1.5rem;
	}
	font-size: 1.6rem !important;
`;
