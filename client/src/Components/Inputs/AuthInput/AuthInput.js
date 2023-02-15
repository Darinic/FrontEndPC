import React from "react";

const AuthInput = ({parameter, onChangeHandler, minLength, maxLength}) => {

	let placeholder;

	switch(parameter) {
	case "UserName":
		placeholder = "Username";
		break;
	case "Email":
		placeholder = "Username Email";
		break;
	case "Password":
		placeholder = "Password";
		break;
	case "PasswordConfirmation":
		placeholder = "Confirm Password";
		break;
	default:
		break;
	}

	return(
		<input
			className="auth__input"
			name={parameter}
			id={parameter}
			type={parameter == "PasswordConfirmation" ? "password" : parameter}
			minLength={minLength}
			maxLength={maxLength}
			required
			placeholder={placeholder}
			onChange={onChangeHandler}
		/>
	);
};

export default AuthInput;