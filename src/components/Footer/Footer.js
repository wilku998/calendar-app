import React from 'react';
import { connect } from 'react-redux';

import FooterContainer, { List, ListTitle } from './styledFooter';

const Footer = ({ className, scrollbarWidth, fake }) => {
	return (
		<FooterContainer fake={fake} scrollbarwidth={scrollbarWidth} className={className}>
			<List textAlign="justify">
				<li>
					<ListTitle textAlign="start">Weather search</ListTitle>
					<span>
						Enter your country and city in the top navigation to search weather. On the calendar, you will
						see forecast only for a specific hour, click on day window to check weather for a whole day.
					</span>
				</li>
				<li>
					<ListTitle textAlign="start">Tasks and budget managing</ListTitle>
					<span>
						Open day window exactly as is described above to add tasks, incomes, and expenses. Click on a
						budget in calendar summary to open proceeds chart.
					</span>
				</li>
			</List>

			<List textAlign="center">
				<li>
					<ListTitle textAlign="center">Contact</ListTitle>
					<span>E-mail: wilkbartosz98@wp.pl</span>
				</li>
				<li>
					<ListTitle textAlign="center">About</ListTitle>
					<span>The application was created for educational purposes.</span>
				</li>
				<li>
					<ListTitle textAlign="center">Privacy policy</ListTitle>
					<span>All rights reserved &copy;</span>
				</li>
			</List>
		</FooterContainer>
	);
};

const mapStateToProps = ({ styles }) => ({
	scrollbarWidth: styles.scrollbarWidth
});

export default connect(mapStateToProps)(Footer);
