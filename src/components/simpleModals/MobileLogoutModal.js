import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../../database/firebase';
import ModalTemplate from './ModalTemplate';

const MobileLogoutModal = ({ logoutModalIsOpen, toggleLogoutModal }) => {
	const closeModal = () => {
		toggleLogoutModal(false);
	};
	const logout = async () => {
		await firebase.auth().signOut();
		closeModal();
	};
	return (
		<ModalTemplate
			confirmInfo="Do you want to logout?"
			closeModal={closeModal}
			confirmFunction={logout}
			modalIsOpen={logoutModalIsOpen}
		/>
	);
};

MobileLogoutModal.propTypes = {
	logoutModalIsOpen: PropTypes.bool.isRequired,
	toggleLogoutModal: PropTypes.func.isRequired
};

export default MobileLogoutModal;
