import theme from '../styledComponents/theme';

export default (value, valid, validator) => {
	return value !== validator ? (valid ? theme.colorGreenLight : theme.colorRedLight) : 'white';
};