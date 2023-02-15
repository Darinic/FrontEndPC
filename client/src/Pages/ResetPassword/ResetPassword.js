import React, {useState, useContext} from "react";
import { Link, useParams } from "react-router-dom";
import AuthInput from "../../Components/Inputs/AuthInput/AuthInput";
import { APIRoutes, appRoutes } from "../../Constants/routes";
import axios from "axios";
import { withLoading } from "../../HOCs/withLoading";
import { ExtractErrorMessage } from "../../Utils/errorHandler";
import { MessageContext } from "../../Context/messageContext";



const ResetPassword = ({setLoading}) => {
	const { email, token } = useParams();
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [resetForm, setResetForm] = useState({
		Email: email,
		Token: token,
		Password: "",
	});
	const { setMessage } = useContext(MessageContext);
	const onChangeHandler = (e) => {
		setResetForm({
			...resetForm,
			[e.target.name]: e.target.value,
		});
	};

	function validatePasswords (Password, PasswordConfirmation) {
		if (Password !== PasswordConfirmation) {
			setMessage("Passwords do not match");
			setLoading(false);
			return;
		}
	}

	const resetPasswordSubmitHandler = async (e) => {
		e.preventDefault();
		validatePasswords(resetForm.Password, passwordConfirmation);
		setLoading(true);
		try {
			await axios.post(APIRoutes.RESETPASSWORD, resetForm);
			setMessage("Password reset successful");
		}
		catch (err) {
			setMessage(ExtractErrorMessage(err));
		}
		setLoading(false);
	};

	return (
		<div className="auth__container">
			<h2 className="heading__secondary">Password Reset</h2>
			<form className="auth__form" onSubmit={resetPasswordSubmitHandler}>
				<AuthInput
					parameter={"Password"}
					onChangeHandler={onChangeHandler}
					minLength={7}
					maxLength={30}
				/>
				<AuthInput
					parameter={"PasswordConfirmation"}
					onChangeHandler={(e) => setPasswordConfirmation(e.target.value)}
					minLength={7}
					maxLength={30}
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


export default withLoading(ResetPassword);