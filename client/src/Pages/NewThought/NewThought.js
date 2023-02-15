import React, { useContext } from "react";
import { useState } from "react";
import useAxios from "../../Hooks/axiosHook";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../../Context/messageContext";

import { APIRoutes, appRoutes } from "../../Constants/routes";
import { withLoading } from "../../HOCs/withLoading";
import { ExtractErrorMessage } from "../../Utils/errorHandler";
import ThoughtForm from "../../Components/ThoughtForm/ThoughtForm";

export const NewThought = ({ setLoading }) => {
	const { setMessage } = useContext(MessageContext);
	const [newThought, setNewThought] = useState({
		thoughtMessage: "",
		firstHashtag: "",
		secondHashtag: "",
	});

	const axiosInstance = useAxios();
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setNewThought({
			...newThought,
			[e.target.name]: e.target.value,
		});
	};

	const CreatingNewThoughtSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axiosInstance.post(APIRoutes.THOUGHTS, newThought);
			setLoading(false);
			navigate(appRoutes.ALLTHOUGHTS);
			setMessage("Your thought has been added succesfully added.");
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};

	return (
		<ThoughtForm 
			heading="Share Your Thought With Us"
			buttonMessage="Create"
			handleSubmit={CreatingNewThoughtSubmit}
			handleInputChange={handleInputChange}
			thought={newThought}
		/>

	);
};

export default withLoading(NewThought);