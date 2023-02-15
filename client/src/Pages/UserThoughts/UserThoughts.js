import React, {useState, useEffect, useContext} from "react";
import { withLoading } from "../../HOCs/withLoading";
import { MessageContext } from "../../Context/messageContext";
import { APIRoutes } from "../../Constants/routes";
import useAxios from "../../Hooks/axiosHook";
import { ExtractErrorMessage } from "../../Utils/errorHandler";
import Thought from "../../Components/Thought/Thought";
import Pagination from "../../Components/Pagination/Pagination";
import { calculateMaxPages } from "../../Utils/calculations";
import { useParams } from "react-router-dom";


const UserThoughts = ({setLoading}) => {
	const [thoughts, setThoughts] = useState([]);
	const [CurrentPage, setCurrentPage] = useState(0);
	const [thoughtsPerPage] = useState(9);
	const [totalThoughts, setTotalThoughts] = useState(0);
	const { username } = useParams();
	const { setMessage } = useContext(MessageContext);
	const axiosInstance = useAxios();

	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	useEffect(() => {
		setLoading(true);
		const fetchThoughts = async () => {
			try {
				const result = await axiosInstance.get(`${APIRoutes.USERTHOUGHTS}/${username}?page=${CurrentPage + 1}&pageSize=${thoughtsPerPage}`);
				if(result.data.thoughts) {
					setThoughts(result.data.thoughts);
					setTotalThoughts(result.data.TotalThoughtCount);
				}
			} catch (err) {
				setMessage(ExtractErrorMessage(err));
			}
			setLoading(false);
		};
		fetchThoughts();
	}, [CurrentPage]);

	return (
		<div className="userThoughts">
			<div className="userThoughts__container">
				{thoughts.length !== 0 ? thoughts.map(thought => (
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
				)) : <h4 className="userThoughts__noThoughtsFound">You have not created any thoughts, create your first one by pressing Share Your Thought</h4>}
			</div>
			<div className="thoughts__pagination">
				{thoughts && 
				<Pagination 
					handlePageClick={handlePageClick}
					maxPages={totalThoughts ? calculateMaxPages(totalThoughts, thoughtsPerPage) : 1} /> }
			</div>
		</div>

	);
};

export default withLoading(UserThoughts);