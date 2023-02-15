/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../Constants/routes";

import AuthInput from "../Inputs/AuthInput/AuthInput";

const Login = ({ submitHandler, onChangeHandler, switchModeHandler }) => {
	return (
		<>
			<h2 className="heading__secondary">Login</h2>
			<form className="auth__form" onSubmit={submitHandler}>
				<AuthInput
					parameter={"Email"}
					onChangeHandler={onChangeHandler}
					minLength={6}
					maxLength={35}
				/>
				<AuthInput 
					parameter={"Password"}
					onChangeHandler={onChangeHandler}
					minLength={7}
					maxLength={30}
				/>
				<button className="auth__submit" type="submit">
					Login
				</button>
			</form>
			<p className="auth__switchAuthModeText">
				Don't have an account?
				<button onClick={switchModeHandler} className="auth__switchAuthModeButton">
					Signup
				</button>
				<Link 
					to={appRoutes.FORGOTPASSWORD} 
					className="auth__forgotPasswordButton">
					{"<"}Forgot Password{">"}
				</Link>
			</p>
		</>
	);
};

export default Login;
