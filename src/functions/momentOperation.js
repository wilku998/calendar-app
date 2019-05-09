export default (momentFunc, monthDiff, yearDiff) => {
	return momentFunc
		.clone()
		[yearDiff >= 0 ? 'add' : 'subtract'](Math.abs(yearDiff), 'years')
		[monthDiff >= 0 ? 'add' : 'subtract'](Math.abs(monthDiff), 'months');
};
