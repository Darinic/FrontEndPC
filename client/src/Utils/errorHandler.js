export const ExtractErrorMessage = (err) => {
	let message;
	if (err.response && err.response.data) {
		if (err.response.data.Message) {
			message = err.response.data.Message;
		} else if (err.response.data.errors) {
			message = Object.values(err.response.data.errors)[0][0];
		} else {
			message = "An unknown error occurred";
		}
	} else {
		message = "An unknown error occurred";
	}
	return message;
};