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
				<CalendarPaddingContainer>
					<Calendar />
				</CalendarPaddingContainer>
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
  	flex: 1;
		overflow: auto;
`;

const CalendarPaddingContainer = styled('div')`
    min-width: 700px;
  	padding: 2rem;
`;
