import { useState, useEffect, useCallback } from "react";
import { setUserInformation, deleteSavedUserInformation, getRemainingTimeOfUserInformation } from "../Utils/authLocalStorage";

let logoutTimer;

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [username, setUsername] = useState(null);

	const login = useCallback((username, token, expirationDate) => {
		setToken(token);
		setUsername(username);
		setTokenExpirationDate(new Date(expirationDate));

		setUserInformation(username, token, expirationDate);
	}, []);


	const logout = useCallback(() => {
		setToken(null);
		setUsername(null);
		setTokenExpirationDate(null);
		
		deleteSavedUserInformation();
	}, []);
	
	const loginIfLocallyStoredUserDataIsStillValid = () => {
		const LocallyStoredUserData = JSON.parse(localStorage.getItem(`${process.env.REACT_APP_USERDATA_STORAGE_NAME}`));
		const isLocallyStoredUserDataValid = LocallyStoredUserData && LocallyStoredUserData.token && new Date(LocallyStoredUserData.tokenExpirationDate) > new Date();
		
		if (isLocallyStoredUserDataValid)
		{
			login(
				LocallyStoredUserData.username,
				LocallyStoredUserData.token,
				LocallyStoredUserData.tokenExpirationDate
			);
		}
	};

	const setLogoutTimerForLocallyStoredUserData = () => {
		if (token && tokenExpirationDate) {
			const remainingTime = getRemainingTimeOfUserInformation();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	};


	useEffect(() => {
		loginIfLocallyStoredUserDataIsStillValid();
	}, [login]);

	useEffect(() => {
		setLogoutTimerForLocallyStoredUserData();
	}, [token, logout, tokenExpirationDate]);

	return { token, login, logout, username };
};