import React, { useState, useContext, useEffect } from "react";
import { APIRoutes } from "../../Constants/routes";

import Thought from "../../Components/Thought/Thought";
import Pagination from "../../Components/Pagination/Pagination";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { MessageContext } from "../../Context/messageContext";
import { withLoading } from "../../HOCs/withLoading";
import useAxios from "../../Hooks/axiosHook";
import { ExtractErrorMessage } from "../../Utils/errorHandler";
import { calculateMaxPages } from "../../Utils/calculations";

export const Thoughts = ({setLoading}) => {
	const [thoughts, setThoughts] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [searchCurrentPage, setSearchCurrentPage] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [thoughtsPerPage] = useState(9);
	const [totalThoughts, setTotalThoughts] = useState(0);
	const { setMessage } = useContext(MessageContext);

	const axiosInstance = useAxios();

	function handlePagination({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const fetchThoughts = async () => {
		try {
			setLoading(true);
			const result = await axiosInstance.get(`${APIRoutes.THOUGHTS}?page=${currentPage + 1}&pageSize=${thoughtsPerPage}`);
			setThoughts(result.data.thoughts);
			setTotalThoughts(result.data.totalCount);
		} 
		catch (err) {
			setMessage(ExtractErrorMessage(err));
		} finally {
			setLoading(false);
		}
	};

	const fetchSearchedThoughts = async () => {
		try{
			setLoading(true);
			const result = await axiosInstance.get(`${APIRoutes.THOUGHTSEARCH}/${searchTerm}?page=${searchCurrentPage + 1}&pageSize=${thoughtsPerPage}`);
			setThoughts(result.data.thoughts);
			setTotalThoughts(result.data.totalCount);
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		} finally {	
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchThoughts();
	}, [currentPage, setCurrentPage]);

	useEffect(() => {
		if (searchTerm.length > 1) {
			setSearchCurrentPage(0);
			fetchSearchedThoughts();
		} else{
			setCurrentPage(0);
			fetchThoughts();
		}
	}, [searchTerm, setSearchTerm]);

	return (
		<div className="thoughts">
			{!thoughts && (
				<div className="thoughts__empty">
					No Thoughts recorded, be the first one!
				</div>
			)}
			<div className="thoughts__searchBar">
				<SearchBar handleSearch={handleSearch} />
			</div>
			<div className="thoughts__container">
				{
					thoughts && Array.isArray(thoughts) && thoughts.map((thought) => {
						return (
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
						);
					})
				}
			</div>
			<div className="thoughts__pagination">
				{thoughts && 
				<Pagination 
					currentPage={searchTerm.length > 1 ? searchCurrentPage : currentPage } 
					handlePageClick={handlePagination} 
					maxPages={totalThoughts ? calculateMaxPages(totalThoughts, thoughtsPerPage) : 1} /> } 
			</div>
		</div>
	);
};

export default withLoading(Thoughts);
