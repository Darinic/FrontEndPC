import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import formatDate from "../../Utils/formatDate";
import { APIRoutes, appRoutes } from "../../Constants/routes";
import { MessageContext } from "../../Context/messageContext";
import { withLoading } from "../../HOCs/withLoading";
import { ExtractErrorMessage } from "../../Utils/errorHandler";
import Comment from "../../Components/Comment/Comment";
import LikeBox from "../../Components/LikeBox/LikeBox";
import useAxios from "../../Hooks/axiosHook";
import AddComment from "../../Components/AddComment/AddComment";
import { AuthContext } from "../../Context/authContext";
import DeleteBox from "../../Components/DeleteBox/DeleteBox";
import ConfirmationModal from "../../Components/ConfirmationModal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import EditableBox from "../../Components/EditableBox/EditableBox";

export const ThoughtDetails = ({setLoading}) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [thought, setThought] = useState({});
	const [comments, setComments] = useState([]);
	const { id } = useParams();

	const navigate = useNavigate();

	const { setMessage } = useContext(MessageContext);
	const { isLoggedIn } = useContext(AuthContext);
	const axiosInstance = useAxios();

	const refreshPage = () => {
		fetchComments();
	};

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const fetchComments = async () => {
		setLoading(true);
		try {
			const comments = await axiosInstance.get(`${APIRoutes.THOUGHTS}/${id}/comments`);
			setComments(comments.data);
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};

	const fetchThought = async () => {
		setLoading(true);
		try {
			const thoughtResult = await axiosInstance.get(`${APIRoutes.THOUGHTS}/${id}`);
			setThought(thoughtResult.data);
			const comments = await axiosInstance.get(`${APIRoutes.THOUGHTS}/${id}/comments`);
			setComments(comments.data);
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchThought();
	}, [id]);

	const deleteThought = async () => {
		setLoading(true);
		try {
			await axiosInstance.delete(`${APIRoutes.THOUGHTS}/${id}`);
			setMessage("Thought deleted successfully");
			navigate(appRoutes.ALLTHOUGHTS);
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};

	return (
		<>
			{thought.id && (
				<div className="details">
					<div className="details__container">
						<div className="details__creationDate">
							{thought.creationDate && formatDate(thought.creationDate)}
						</div>
						{thought ? (<LikeBox 
							thoughtId={thought.id}
							likesCount={thought.likesCount}
							liked={thought.isLiked}/>
						) : null }
						<h3 className="heading__secondary">Thought Details</h3>
						<label className="details__label">Author</label>
						<input
							className="details__input"
							type="text"
							defaultValue={thought.userName}
							disabled
						/>
						
						<label className="details__label"> Thought </label>
						<textarea
							className="details__textarea"
							type="text"
							value={thought.thoughtMessage}
							disabled
						/>
						<div className="details__hashtagsBox">
							<div className="details__hashtag">
								<label className="details__label"> #1 </label>
								<input
									className="details__input"
									type="text"
									defaultValue={thought.firstHashtag}
									disabled
								/>
							</div>
							<div className="details__hashtag">
								<label className="details__label"> #2 </label>
								<input
									className="details__input"
									type="text"
									defaultValue={thought.secondHashtag}
									disabled
								/>
							</div>
						</div>
						<DeleteBox 
							Username={thought.userName}
							openModal={openModal}
							classNameStyle={"details__deleteBox"}/>
						<ConfirmationModal 
							modalIsOpen={modalIsOpen}
							closeModal={closeModal}
							execute={deleteThought}
							message={"Thought"} 
						/>
						<div className="details__commentCount">
							Comments: 
							<span className="details__commentCount--spanCount">
								{thought.commentsCount}
							</span>
						</div>
						<EditableBox 
							userName={thought.userName}
							id={thought.id}
						/>
					</div>
					<div>
						<div className={`details__comments ${comments.length > 2 ? "details__comments--scrollable" : ""}`}>
							{isLoggedIn && <AddComment 
								refreshPage={refreshPage}
							/>}
							{comments.length !== 0 && comments.map((comment) => (
								<Comment 
									key={comment.id} 
									comment={comment} 
									refreshPage={refreshPage} 
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default withLoading(ThoughtDetails);
