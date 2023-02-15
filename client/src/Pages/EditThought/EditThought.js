import React, {useState, useEffect, useContext} from "react";
import {withLoading} from "../../HOCs/withLoading";
import { APIRoutes } from "../../Constants/routes";
import {useParams} from "react-router-dom";
import {ExtractErrorMessage} from "../../Utils/errorHandler";
import {MessageContext} from "../../Context/messageContext";
import useAxios from "../../Hooks/axiosHook";
import ThoughtForm from "../../Components/ThoughtForm/ThoughtForm";

const EditThought = ({setLoading}) => {
	const [EditableThought, setEditableThought] = useState({});
	const {id} = useParams();
	const {setMessage} = useContext(MessageContext);

	const axiosInstance = useAxios();

	const fetchThought = async () => {
		try {
			setLoading(true);
			const result = await axiosInstance.get(`${APIRoutes.THOUGHTS}/${id}`);
			setEditableThought(result.data);
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchThought();
	}, [id]);

	const handleInputChange = (e) => {
		setEditableThought({
			...EditableThought,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axiosInstance.put(`${APIRoutes.THOUGHTS}/${id}`, EditableThought);
			setLoading(false);
			setMessage("Your thought has been updated succesfully.");
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
        
	};

	
	return (
		<ThoughtForm 
			heading="Edit Your Thought"
			buttonMessage="Update"
			handleSubmit={handleSubmit}
			handleInputChange={handleInputChange}
			thought={EditableThought}
		/>
	);
};

export default withLoading(EditThought);