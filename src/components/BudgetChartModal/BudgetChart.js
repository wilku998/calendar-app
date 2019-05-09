import React, { useLayoutEffect, useRef } from 'react';
import Chart from 'chart.js';
import numeral from 'numeral';


const BudgetChart = ({points}) => {
	const containerRef = useRef();

	useLayoutEffect(() => {
		new Chart(containerRef.current.getContext('2d'), {
			type: 'line',
			data: {
				labels: points.map(e => e.date),
				datasets: [
					{
						label: 'Budget',
						data: points.map(e => e.sum)
					}
				]
			}
		});
	});

	return <canvas ref={containerRef} />;
};

export default BudgetChart