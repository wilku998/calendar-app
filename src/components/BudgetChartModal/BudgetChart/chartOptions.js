import formatBudget from '../../../functions/formatBudget';

export default (points) => ({
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		scaleLabel: {
			display: false
		},
		yAxes: [
			{
				ticks: {
					callback: (value) => formatBudget(value)
				}
			}
		]
	},
	tooltips: {
		displayColors: false,
		titleFontSize: 14,
		bodyFontSize: 12,
		xPadding: 10,
		yPadding: 10,
		titleFontStyle: '400',
		titleMarginBottom: 10,
		callbacks: {
			label: (tooltipItem) => points[tooltipItem.index].items.map((e) => `${e.title}: ${formatBudget(e.value)}`),
			afterTitle: (tooltipItem) => `Budget: ${formatBudget(tooltipItem[0].yLabel)}`,
			title: (tooltipItem) => `Date: ${points[tooltipItem[0].index].date}`
		}
	}
});
