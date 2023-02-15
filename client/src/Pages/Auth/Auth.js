import React, { useState, useContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { APIRoutes, appRoutes } from "../../Constants/routes";
import { MessageContext } from "../../Context/messageContext";
import Register from "../../Components/Register/Register";
import Login from "../../Components/Login/Login";
import { AuthContext } from "../../Context/authContext";
import { withLoading } from "../../HOCs/withLoading";
import { ExtractErrorMessage } from "../../Utils/errorHandler";


export const Auth = ({setLoading}) => {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [authForm, setAuthForm] = useState({});

	const {setMessage} = useContext(MessageContext);
	const {login} = useContext(AuthContext);

	const navigate = useNavigate();

	const switchModeHandler = () => {
		setAuthForm({});
		setIsLoginMode((prevMode) => !prevMode);
	};

	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setAuthForm((prevForm) => ({
			...prevForm,
			[name]: value,
		}));
	};

	function validatePassword (password, passwordConfirmation) {
		if(password !== passwordConfirmation) {
			setMessage("Passwords do not match");
			return;
		}
	}

	const RegistrationFormSubmitHandler = async (event) => {
		event.preventDefault();
		validatePassword(authForm.password, authForm.passwordConfirmation);
		setLoading(true);
		try {
			await axios.post(APIRoutes.SIGNUP, authForm);
			setMessage("Account created successfully, Login now");
			setLoading(false);
			navigate(appRoutes.ALLTHOUGHTS);
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};

	const LoginFormSubmitHandler = async (event) => {
		event.preventDefault();
		setLoading(true);
		try 
		{
			const response = await axios.post(APIRoutes.LOGIN, authForm);
			login(response.data.userName, response.data.token, response.data.expireDate);
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};

	return (
		<div className="auth">
			<div className="auth__container">

				{isLoginMode ? (
					<Login 
						switchModeHandler={switchModeHandler}
						submitHandler={LoginFormSubmitHandler}
						onChangeHandler={onChangeHandler}   
					/>
				) : (
					<Register 
						switchModeHandler={switchModeHandler}
						submitHandler={RegistrationFormSubmitHandler}
						onChangeHandler={onChangeHandler} 
					/>
				)}
			</div>
		</div>
	);
};

export default withLoading(Auth);
