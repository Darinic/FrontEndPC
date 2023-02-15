import React from "react";
import Modal from "react-modal";

const ConfirmationModal = ({modalIsOpen, closeModal, execute, message}) => {
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			className="modal"
		>
			<h2>Are you sure you want to delete {message}? No turning back!</h2>
			<div className="modal__buttons">
				<button className="modal__button" onClick={execute}>
					Yes
				</button>
				<button className="modal__button" onClick={closeModal}>
					No
				</button>
			</div>
		</Modal>
	);
};

export default ConfirmationModal;