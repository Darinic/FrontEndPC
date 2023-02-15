import React, { useContext, useState } from "react";
import formatDate from "../../Utils/formatDate";
import useAxios from "../../Hooks/axiosHook";
import { APIRoutes } from "../../Constants/routes";
import { ExtractErrorMessage } from "../../Utils/errorHandler";
import { MessageContext } from "../../Context/messageContext";
import { withLoading } from "../../HOCs/withLoading";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import DeleteBox from "../DeleteBox/DeleteBox";

const Comment = ({ comment, setLoading, refreshPage }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const { setMessage } = useContext(MessageContext);

	const axiosInstance = useAxios();

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const deleteComment = async () => {
		setLoading(true);
		try {
			await axiosInstance.delete( `${APIRoutes.DELETECOMMENT}/${comment.id}`);
			closeModal();
			refreshPage();
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};


	return (
		<div key={comment.id} className="comment">
			<p className="comment__username">
				{comment.userName}
			</p>
			<p className="comment__commentText">
				{comment.commentMessage}
			</p>
			<p className="comment__commentDate">
				{comment && formatDate(comment.creationDate)}
			</p>
			<DeleteBox 
				Username={comment.userName}
				openModal={openModal}
				classNameStyle="comment__deleteComment" 
			/>
			<ConfirmationModal 
				modalIsOpen={modalIsOpen} 
				closeModal={closeModal} 
				execute={deleteComment} 
				message={"comment"} 
			/>
		</div>
	);
};

export default withLoading(Comment);
