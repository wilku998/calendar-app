import database from '../database/firebase';

const setItemsInRedux = (items, kind) => ({
	type: 'SET_ITEMS',
	items,
	kind
});

export const setItems = (refs) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid;

		const promises = refs.map((ref) => {
			return database.ref(`users/${uid}/${ref}`).once('value').then((res) => {
				const result = res.val();
				if (result) {
					const items = Object.keys(result).map((id) => {
						return { ...result[id], id };
					});

					dispatch(setItemsInRedux(items, ref));
				}
			});
		});
		return Promise.all(promises);
	};
};

const addItemInRedux = (items, kind) => ({
	type: 'ADD_ITEM',
	item,
	kind
});

export const addItem = (type, item) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;
		const res = await database.ref(`users/${uid}/${type}`).push(item);
		const item = { ...item, id: res.key }
		dispatch(addItemInRedux(item, type));
	};
};

