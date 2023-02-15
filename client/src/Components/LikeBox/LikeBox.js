import React, {useState, useContext} from "react";
import useAxios from "../../Hooks/axiosHook";
import LightBubble from "../../Assets/Img/lightBulb.png";
import LightBubbleLiked from "../../Assets/Img/lightBulbLiked.png";
import {APIRoutes} from "../../Constants/routes";
import {withLoading} from "../../HOCs/withLoading";
import { AuthContext } from "../../Context/authContext";
import { ExtractErrorMessage } from "../../Utils/errorHandler";
import { MessageContext } from "../../Context/messageContext";

export const LikeBox = ({thoughtId, likesCount, liked, setLoading}) => {
	const [isLiked, setIsLiked] = useState(liked);
	const [likes, setLikes] = useState(likesCount || 0);

	const axiosInstance = useAxios();
	const {setMessage} = useContext(MessageContext);
	const {username} = useContext(AuthContext);

	const deleteLike = async () => {
		try{
			await axiosInstance.delete(`${APIRoutes.LIKE}/${thoughtId}`);
			setLikes(likes - 1);
			setIsLiked(false);
		}
		catch(err){
			setMessage(ExtractErrorMessage(err));
		}
	};

	const addLike = async () => {
		try{
			await axiosInstance.post(`${APIRoutes.LIKE}/${thoughtId}`);
			setLikes(likes + 1);
			setIsLiked(true);
		}
		catch(err){
			setMessage(ExtractErrorMessage(err));
		}
	};

	const likeHandler =  async () => {
		setLoading(true);
		if (isLiked) {
			deleteLike();
		} else {
			addLike();
		}
		setLoading(false);
	};

	const image = isLiked ? LightBubbleLiked : LightBubble;

	return (
		<div className="likeBox__container"> 
			{username ? (
				<div className="likebox__imageContainer">
					<img 
						onClick={likeHandler} 
						className="likebox__image" 
						src={image} 
						alt="lightbulb" 
					/>
				</div>
			) : (
				<h4 className="likeBox__likeLabel">
					Likes
				</h4>
			)}
			<h5 className="likeBox__likeCount">
				{likes}
			</h5>

            
		</div>
	);
};

export default withLoading(LikeBox);