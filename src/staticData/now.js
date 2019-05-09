import moment from 'moment';
const now = moment();

export default {
	momentFunc: now,
	yearInt: parseInt(now.format('YYYY')),
	monthInt: parseInt(now.format('MM')),
	dayInt: parseInt(now.format('DD'))
};
