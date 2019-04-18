import styled from "styled-components";
import React, { Fragment } from "react";

import Calendar from './Calendar/Calendar';
import SubNavigation from './SubNavigation';
import Navigation from './Navigation/Navigation';
import CalendarModal from './CalendarModal/CalendarModal';

export default () => (
		<Fragment>
			<CalendarModal />
			<Navigation />
			<SubNavigation />
			<Main>
				<Calendar />
			</Main>
		</Fragment>
);

const Main = styled.main`
	margin-left: 25rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.colorGreyDark2};
`;
