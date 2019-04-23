import styled from 'styled-components';
import React from 'react';

import Calendar from './Calendar/Calendar';
import SubNavigation from './SubNavigation/SubNavigation';
import Navigation from './Navigation/Navigation';
import CalendarModal from './CalendarModal/CalendarModal';

export default () => (
	<Root>
		<CalendarModal />
		<Navigation />
		<Main>
			<SubNavigation />
			<CalendarContainer>
				<CalendarContent>
					<Calendar />
				</CalendarContent>
			</CalendarContainer>
		</Main>
	</Root>
);

const Main = styled('main')`
	flex: 1;
	display: flex;
	color: ${(props) => props.theme.colorGreyDark2};
`;

const Root = styled('div')`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;
const CalendarContainer = styled('div')`
	padding: 2rem;
  	flex: 1;
	overflow: auto;
`;

const CalendarContent = styled('div')`
	width: 70.1rem;
	height: 100%;
	display: flex;
	align-items: center;
	margin: auto;
`;
