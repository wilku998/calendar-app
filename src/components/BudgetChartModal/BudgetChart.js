import React, { useLayoutEffect, useRef } from 'react';
import Chart from 'chart.js';

const BudgetChart = () => {
	const containerRef = useRef();

	useLayoutEffect(() => {
		new Chart(containerRef.current.getContext('2d'), {
			type: 'line',
			data: {
				labels: [ 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange' ],
				datasets: [
					{
						data: [ 1, 2, 3, 4, 5, 6, 7 ]
					}
				]
			}
		});
	}, []);

	return <canvas ref={containerRef} style={{ height: 500, width: 500 }} />;
};

export default BudgetChart;
