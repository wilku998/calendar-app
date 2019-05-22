import { LOGIN, LOGOUT } from '../actionsNames';

export const login = (uid) => ({
	type: LOGIN,
	uid
});

export const logout = () => ({
	type: LOGOUT
});
