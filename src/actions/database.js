import database from '../database/firebase';

export const setData = (refs) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;

		const promises = refs.map((ref) => {
			return database.ref(`users/${uid}/${ref}`).once('value').then((res) => {
				const result = res.val();
				if (result) {
					dispatch({
						type: `SET_${ref.toUpperCase()}`,
						[ref]: Object.keys(result).map((id) => {
							return { ...result[id], id };
						})
					});
				}
			});
		});
		return Promise.all(promises);
	};
};

export const addItem = (type, item) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;
		const res = await database.ref(`users/${uid}/${type}`).push(item);
		type === 'tasks'
			? dispatch({ type: `ADD_TASK`, task: { ...item, id: res.key } })
			: dispatch({ type: `ADD_BUDGET_ITEM`, item: { ...item, id: res.key }, kind: type });
	};
};
