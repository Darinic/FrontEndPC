
const getUserData = () => {
	const userdata = JSON.parse(localStorage.getItem(`${process.env.REACT_APP_USERDATA_STORAGE_NAME}`));
	return userdata;
};

export const checkUserInformation = () => {
	const userData = getUserData();
	if (userData && userData.token && new Date(userData.tokenExpirationDate) > new Date()) {
		return userData;
	}
	return false;
};

export const deleteSavedUserInformation = () => {
	localStorage.removeItem(`${process.env.REACT_APP_USERDATA_STORAGE_NAME}`);
};

export const setUserInformation = (username, token, expirationDate) => {
	localStorage.setItem(`${process.env.REACT_APP_USERDATA_STORAGE_NAME}`, JSON.stringify({
		username: username,
		token: token,
		tokenExpirationDate: new Date(expirationDate),
	}));
};

export const getRemainingTimeOfUserInformation = () => {
	const userData = getUserData();
	const remainingTime = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
	return remainingTime;
};





