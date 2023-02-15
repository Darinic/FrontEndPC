import React from "react";
import { Link } from "react-router-dom";
import LikeBox from "../LikeBox/LikeBox";
import { appRoutes } from "../../Constants/routes";
import EditableBox from "../EditableBox/EditableBox";

const Thought = ({id, hashtag1, hashtag2, thought, isLiked, likesCount, commentCount, userName}) => {
	return (
		
		<div className="item">
			<Link to={`${appRoutes.THOUGHTDETAILS.replace(":id", `${id}`)}`} className="item__link">
				<p className="item__content">{thought}</p>
				<div className="item__hashtags">
					<div>
						<span className="item__hashtagSymbol">#</span>
						{hashtag1}
					</div>
					<div>
						<span className="item__hashtagSymbol">#</span>
						{hashtag2}
					</div>
				</div>
				<div className="item__commentCount">
					Comments: 
					<span className="item__commentCount--spanCount">
						{commentCount}
					</span>
				</div>
			</Link>
			<EditableBox 
				userName={userName} 
				id={id} 
			/>
			<div>
				<LikeBox 
					thoughtId={id} 
					likesCount={likesCount} 
					liked={isLiked} 
				/>
			</div>
		</div>
	);
};

export default Thought;
