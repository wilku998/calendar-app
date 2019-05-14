import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { setScrollbarWidth } from '../../actions/styles';
import Footer from '../Footer/Footer';
import Calendar from '../Calendar/Calendar';

const MainContent = ({ className, setScrollbarWidth }) => {
	const componentRef = useRef();
	useLayoutEffect(() => {
		const scrollbarWidth = componentRef.current.offsetWidth - componentRef.current.clientWidth;
		setScrollbarWidth(scrollbarWidth);
	}, []);
	return (
		<div ref={componentRef} className={className}>
			<Calendar />
			<Footer fake={true} />
			<Footer fake={false} />
		</div>
	);
};

const style = (MainContent) => styled(MainContent)`
  	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
`;

const mapDispatchToProps = (dispatch) => ({
	setScrollbarWidth: (value) => dispatch(setScrollbarWidth(value))
});

export default connect(undefined, mapDispatchToProps)(style(MainContent));
