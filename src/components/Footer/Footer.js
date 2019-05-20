import React from 'react';
import PropTypes from 'prop-types'
import FooterContainer, { List, ListTitle } from './styledFooter';

const Footer = ({ scrollbarWidth, fake }) => {
	return (
		<FooterContainer fake={fake} scrollbarwidth={scrollbarWidth}>
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

Footer.propTypes={
	scrollbarWidth: PropTypes.number.isRequired,
	fake: PropTypes.bool.isRequired
}
export default Footer;
