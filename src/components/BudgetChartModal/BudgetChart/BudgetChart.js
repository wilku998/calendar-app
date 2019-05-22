import React, { useLayoutEffect, useRef } from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

import createChartData from './chartData';
import createChartOptions from './chartOptions';
import { ChartContainer } from '../styledBudgetChartModal';

Chart.defaults.global.legend.display = false;

const BudgetChart = ({ points, timePeroid }) => {
	const containerRef = useRef();
	useLayoutEffect(
		() => {
			const myChart = new Chart(containerRef.current.getContext('2d'), {
				type: 'line',
				data: createChartData(points, timePeroid),
				options: createChartOptions(points)
			});
			return () => myChart.destroy();
		},
		[ points, timePeroid ]
	);

	return (
		<ChartContainer>
			<canvas ref={containerRef} />
		</ChartContainer>
	);
};

BudgetChart.propTypes = {
	points: PropTypes.arrayOf(PropTypes.object).isRequired,
	timePeroid: PropTypes.shape({
		month: PropTypes.string.isRequired,
		monthNum: PropTypes.string.isRequired,
		year: PropTypes.string.isRequired
	}).isRequired
};

export default BudgetChart;
