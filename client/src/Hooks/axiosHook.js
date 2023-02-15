import axios from "axios";

const useAxios = () => {
	const userData = JSON.parse(localStorage.getItem(`${process.env.REACT_APP_USERDATA_STORAGE_NAME}`));

	if(!userData) return axios.create({
		headers: {
			"Content-Type": "application/json"
		}
	});

	const customAxios= axios.create({
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${userData.token}`
		}
	});

	return customAxios;
};

export default useAxios;