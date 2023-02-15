import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import { appRoutes } from "./Constants/routes";
import { AuthContext } from "./Context/authContext";
import { useAuth } from "./Hooks/authHook";
import { MessageContext } from "./Context/messageContext";
import WrappedComponent from "./Components/WrappedComponent/WrappedComponent";

import Homepage from "./Pages/Homepage/Homepage";
import Thoughts from "./Pages/Thoughts/Thoughts";
import NewThought from "./Pages/NewThought/NewThought";
import ThoughtDetails from "./Pages/ThoughtDetails/ThoughtDetails";
import Auth from "./Pages/Auth/Auth";
import Top9List from "./Pages/Top9List/Top9List";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import UserThoughts from "./Pages/UserThoughts/UserThoughts";
import EditThought from "./Pages/EditThought/EditThought";

function App() {
	const [message, setMessage] = useState("");
	const { token, login, logout, username } = useAuth();

	let ChangingRoutes;

	if (token) {
		ChangingRoutes = (
			<>
				<Route path={appRoutes.NEWTHOUGHT} element={<NewThought />} />
				<Route path={appRoutes.EDITTHOUGHT} element={<EditThought />} />
			</>
		);
	} else {
		ChangingRoutes = (
			<>
				<Route path={appRoutes.AUTH} element={<Auth />} />
				<Route path={appRoutes.FORGOTPASSWORD} element={<ForgotPassword />} />
				<Route path={appRoutes.RESETPASSWORD} element={<ResetPassword />} />
			</>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				login: login,
				logout: logout,
				username: username,
				token: token,
			}}
		>
			<MessageContext.Provider value={{ message, setMessage }}>
				<Router>
					<WrappedComponent>
						<Routes>
							<Route path={appRoutes.HOMEPAGE} exact element={<Homepage />} />
							<Route path={appRoutes.ALLTHOUGHTS} element={<Thoughts />} />
							<Route
								path={appRoutes.THOUGHTDETAILS}
								element={<ThoughtDetails />}
							/>
							<Route path={appRoutes.TOP9LIST} element={<Top9List />} />
							<Route path={appRoutes.USERTHOUGHTS} element={<UserThoughts />} />
							<Route
								path={appRoutes.INCORRECTROUTE}
								element={<Navigate to={appRoutes.ALLTHOUGHTS} />}
							/>
							{ChangingRoutes}
						</Routes>
					</WrappedComponent>
				</Router>
			</MessageContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
