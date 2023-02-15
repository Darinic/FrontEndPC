import React, {useState, useContext} from "react";
import { AuthContext } from "../../Context/authContext";
import useAxios from "../../Hooks/axiosHook";
import { APIRoutes } from "../../Constants/routes";
import { ExtractErrorMessage } from "../../Utils/errorHandler";
import { withLoading } from "../../HOCs/withLoading";
import { MessageContext } from "../../Context/messageContext";
import { useParams } from "react-router-dom";

const AddComment = ({setLoading, refreshPage}) => {
	const [comment, setComment] = useState({
	});

	const { username } = useContext(AuthContext);
	const { setMessage } = useContext(MessageContext);
	const { id } = useParams();
	const axiosInstance = useAxios();

	const handleCommentChange = (e) => {
		setComment({
			...comment,
			[e.target.name]: e.target.value
		});
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		PostComment();
	};

	const PostComment = async () => {
		setLoading(true);
		try{
			await axiosInstance.post(`${APIRoutes.POSTCOMMENT}/${id}`, comment);
			refreshPage();
		}
		catch(err){
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};

	return (
		<div className="addComment">
			<h4 className="addComment__title">Leave a comment!</h4>
			<form className="addComment__form" onSubmit={handleCommentSubmit}>
				<p className="addComment__username">
					{username}
				</p>
				<input 
					type="text" 
					maxLength={40} 
					minLength={5} 
					required 
					name="commentMessage" 
					className="addComment__commentInput" 
					onChange={handleCommentChange} />
				<button className="addComment__button" type="submit">
					Comment
				</button>
			</form>
		</div>
	);
};

export default withLoading(AddComment);