export default (value, property) => {
	switch (property) {
		case 'title':
			return value.length >= 3 && value.length <= 20;
		case 'description': {
			let wordsValid = true;
			value.split(' ').forEach((e) => {
				if (e.length > 20) {
					wordsValid = false;
				}
			});
			return value.length <= 400 && wordsValid;
		}
		case 'value':
			return !Number.isNaN(value) && value > 0 && value < 1000000;
		default:
			return true;
	}
};
