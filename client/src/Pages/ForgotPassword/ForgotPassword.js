import React, {useState, useContext} from "react";
import axios from "axios";
import { MessageContext } from "../../Context/messageContext";
import { Link } from "react-router-dom";

import AuthInput from "../../Components/Inputs/AuthInput/AuthInput";
import { APIRoutes,appRoutes } from "../../Constants/routes";
import { withLoading } from "../../HOCs/withLoading";
import { ExtractErrorMessage } from "../../Utils/errorHandler";

const ForgotPassword = ({setLoading}) => {
	const [email, setEmail] = useState("");
	const {setMessage} = useContext(MessageContext);

	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setEmail((prevEmail) => ({
			...prevEmail,
			[name]: value,
		}));
	};

	const forgotPasswordSubmitHandler = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			await axios.post(APIRoutes.FORGOTPASSWORD, email);
			setMessage("Reset password email has been sent");
		} catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};

	return (
		<div className="auth__container">
			<h2 className="heading__secondary">Reset Password</h2>
			<form className="auth__form" onSubmit={forgotPasswordSubmitHandler}>
				<AuthInput
					parameter={"Email"}
					onChangeHandler={onChangeHandler}
					minLength={6}
					maxLength={50}
				/>
				<button className="auth__submit" type="submit">
                    Reset Password
				</button>
				<Link className="auth__forgotPasswordButton" to={appRoutes.AUTH}> 
					Switch back to login page
				</Link>
			</form>
		</div>
	);
};

export default withLoading(ForgotPassword);