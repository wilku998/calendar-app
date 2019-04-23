import React from 'react';
import Modal from 'react-modal';
import { Button } from 'antd';
import { firebase } from '../../database/firebase';

import { overlayStyles } from '../CalendarModal/styledCalendarModal';

const contentStyles = {
	content: {
		position: 'relative',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		display: 'flex',
		flexDirection: 'column',
		padding: '4rem',
		borderRadius: '0.3rem'
	}
};

export default ({ logoutModalIsOpen, toggleLogoutModal }) => {
	const closeModal = () => {
		toggleLogoutModal(false);
	};
	const logout = async () => {
		await firebase.auth().signOut();
		closeModal();
	};
	return (
		<Modal
			ariaHideApp={false}
			isOpen={logoutModalIsOpen}
			onRequestClose={closeModal}
			style={{ ...overlayStyles, ...contentStyles }}
		>
			<Button onClick={logout} type="primary">
				Logout
			</Button>
			<Button onClick={closeModal} type="primary" style={{ marginTop: '3rem' }}>
				Close
			</Button>
		</Modal>
	);
};
