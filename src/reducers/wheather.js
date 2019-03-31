import { fakeWheatherObject } from '../fakedata/data';
import splitWheatherDays from '../functions/splitWheatherDays';

export default (state = splitWheatherDays(fakeWheatherObject), action) => {
	const { type } = action;
	switch (type) {
		case 'SET_WHEATER':
			return splitWheatherDays(action.fiveDaysWheather);
		default:
			return state;
	}
};
