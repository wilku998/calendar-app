import React from 'react';
import Modal from 'react-modal';
import { Button } from 'antd';
import PropTypes from 'prop-types';

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
		padding: '2rem',
		borderRadius: '0.3rem',
		fontSize: '1.6rem',
		maxWidth: '30rem',
		textAlign: 'center'
	}
};

const ModalTemplate = ({ modalIsOpen, closeModal, confirmFunction, confirmInfo }) => {
	return (
		<Modal
			ariaHideApp={false}
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={{ ...overlayStyles, ...contentStyles }}
		>
			<span style={{ marginBottom: '2rem' }}>{confirmInfo}</span>
			<Button size="small" onClick={confirmFunction} type="primary">
				Yes
			</Button>
			<Button size="small" onClick={closeModal} type="primary" style={{ marginTop: '2rem' }}>
				Close
			</Button>
		</Modal>
	);
};

ModalTemplate.propTypes = {
	modalIsOpen: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
	confirmFunction: PropTypes.func.isRequired,
	confirmInfo: PropTypes.string.isRequired
};

export default ModalTemplate;
