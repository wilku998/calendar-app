import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Footer from '../Footer/Footer';
import Calendar from '../Calendar/Calendar';

const MainContent = ({ className }) => {
	const componentRef = useRef();
	const [scrollbarWidth, setScrollbarWidth] = useState(0);
	useLayoutEffect(() => {
		setScrollbarWidth(componentRef.current.offsetWidth - componentRef.current.clientWidth);
	}, []);

	return (
		<div ref={componentRef} className={className}>
			<Calendar />
			<Footer scrollbarWidth={scrollbarWidth} fake={true} />
			<Footer scrollbarWidth={scrollbarWidth} fake={false} />
		</div>
	);
};

const style = (MainContent) => styled(MainContent)`
  	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
`;

export default style(MainContent);
