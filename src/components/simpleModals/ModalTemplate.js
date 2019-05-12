import React from 'react';
import Modal from 'react-modal';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import theme from '../../styledComponents/theme';

const styleModal = (Modal) => styled(Modal)`
	${({ theme }) => theme.modalStyles}
	display: flex;
	flex-direction: column;
	padding: 2rem;
	font-size: 1.6rem;
	max-width: 30rem;
	text-align: center;
`;

const ModalTemplate = ({ modalIsOpen, closeModal, confirmFunction, confirmInfo, className }) => {
	return (
		<Modal
			ariaHideApp={false}
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={theme.modalOverlayStyles}
			className={className}
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
	confirmInfo: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired
};

export default styleModal(ModalTemplate);
