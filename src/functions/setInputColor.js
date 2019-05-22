import theme from '../styledComponents/theme';

export default (value, valid, validator) => {
	if (value === validator) {
		return 'white';
	}
	return valid ? theme.colorGreenLight : theme.colorRedLight;
};
