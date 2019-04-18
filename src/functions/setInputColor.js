import theme from '../styledComponentsTheme/styledComponentsTheme';

export default (value, valid, validator) => {
	return value !== validator ? (valid ? theme.colorGreenLight : theme.colorRedLight) : 'white';
};