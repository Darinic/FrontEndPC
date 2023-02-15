import React, {useState, useEffect, useContext} from "react";
import Thought from "../../Components/Thought/Thought";
import { withLoading } from "../../HOCs/withLoading";
import { APIRoutes } from "../../Constants/routes";
import useAxios from "../../Hooks/axiosHook";
import { ExtractErrorMessage } from "../../Utils/errorHandler";
import { MessageContext } from "../../Context/messageContext";


const Top9List = ({setLoading}) => {
	const [thoughts, setThoughts] = useState([]);
	const [isChosen, setIsChosen] = useState(APIRoutes.TOP9ALLTIME);

	const axiosInstance = useAxios();
	const { setMessage } = useContext(MessageContext);

	const handleMostLikedPostsClick = async (route) => {
		setLoading(true);
		try {
			const result = await axiosInstance.get(route);
			setThoughts(result.data.thoughts);
			setIsChosen(route);
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};

	useEffect(() => {
		handleMostLikedPostsClick(isChosen);
	}, []);

	return(
		<div className="top9List">
			<div className="top9List__container">
				<div className="top9List__ButtonContainer">
					<button 
						className={`top9List__choosingButton ${isChosen === APIRoutes.TOP9ALLTIME && "top9List__choosingButton--selected"}`} 
						onClick={() => handleMostLikedPostsClick(APIRoutes.TOP9ALLTIME)}>
						All time most liked thoughts
					</button>
					<button 
						className={`top9List__choosingButton ${isChosen === APIRoutes.TOP9LASTMONTH && "top9List__choosingButton--selected"}`} 
						onClick={() => handleMostLikedPostsClick(APIRoutes.TOP9LASTMONTH)}>
						Most liked thoughts in last 30 days
					</button>
					<button 
						className={`top9List__choosingButton ${isChosen === APIRoutes.TOP9LASTWEEK && "top9List__choosingButton--selected"}`}
						onClick={() => handleMostLikedPostsClick(APIRoutes.TOP9LASTWEEK)}>
						Most liked thoughts in last 7 days
					</button>
				</div>
				<div className="top9List__listContainer">
					{thoughts ? thoughts.map(thought => (
						<Thought 
							key={thought.id}
							id={thought.id}
							likesCount={thought.likesCount}
							isLiked={thought.isLiked}
							thought={thought.thoughtMessage}
							hashtag1={thought.firstHashtag}
							hashtag2={thought.secondHashtag} 
							commentCount={thought.commentsCount}
							userName={thought.userName}
						/>
					)) : 
						<div className="top9List__noThoughts">
							<h3>No Thoughts have been founds for this period of time</h3>
						</div>}
				</div>
			</div>
		</div>
	);
};

export default withLoading(Top9List);