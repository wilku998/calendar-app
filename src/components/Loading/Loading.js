import React from 'react';
import PropTypes from 'prop-types';

import styleLoading from './LoadingStyles';

const Loading = ({ className }) => (
	<div className={className}>
		<div />
		<div />
		<div />
		<div />
	</div>
);

Loading.propTypes = {
	className: PropTypes.string.isRequired
};



export default styleLoading(Loading);
