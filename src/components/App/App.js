import React from 'react';
import styled from 'styled-components';

import MainContent from './MainContent';
import SubNavigation from '../SubNavigation/SubNavigation';
import Navigation from '../Navigation/Navigation';
import CalendarModal from '../CalendarModal/CalendarModal';

export default () => (
	<Root>
		<CalendarModal />
		<Navigation />
		<Main>
			<SubNavigation />
			<MainContent />
		</Main>
	</Root>
);

const Main = styled('main')`
	flex: 1;
	display: flex;
	color: ${(props) => props.theme.colorGreyDark2};
	overflow: hidden;
`;

const Root = styled('div')`
	height: 100vh;
	display: flex;
	flex-direction: column;
`;
