import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ModalTemplate from './ModalTemplate';
import { removeItems } from '../../actions/items';

const RemoveAllModal = ({ removeAllModalProps, toggleRemoveAllModal, removeItems }) => {
	const { type, modalIsOpen } = removeAllModalProps;
	const closeModal = () => {
		toggleRemoveAllModal({ modalIsOpen: false, type: undefined });
	};

	const removeAll = async () => {
		await removeItems(type);
		closeModal();
	};

	return (
		<ModalTemplate
			closeModal={closeModal}
			confirmFunction={removeAll}
			modalIsOpen={modalIsOpen}
			confirmButtonText="Remove"
			confirmInfo={`Are you sure you want to remove all ${type}?`}
		/>
	);
};

RemoveAllModal.propTypes = {
	removeAllModalProps: PropTypes.object.isRequired,
	toggleRemoveAllModal: PropTypes.func.isRequired,
	removeItems: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
	removeItems: (type) => dispatch(removeItems(type))
});

export default connect(undefined, mapDispatchToProps)(RemoveAllModal);
