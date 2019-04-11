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

const addItemInRedux = (item, kind) => ({
	type: 'ADD_ITEM',
	item,
	kind
});

export const addItem = (kind, item) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;
		const res = await database.ref(`users/${uid}/${kind}`).push(item);
		dispatch(addItemInRedux({ ...item, id: res.key }, kind));
	};
};

export const removeItems = (kind) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;
		await database.ref(`users/${uid}/${kind}`).remove();
		dispatch(setItemsInRedux([], kind));
	};
};

const removeItemInRedux = (id, kind) => ({
	type: 'REMOVE_ITEM',
	id,
	kind
});

export const removeItem = (id, kind) => {
	return async (dispatch, getState) => {
		console.log({id, kind})
		const uid = getState().auth.uid;
		await database.ref(`users/${uid}/${kind}/${id}`).remove();
		dispatch(removeItemInRedux(id, kind));
	};
};
