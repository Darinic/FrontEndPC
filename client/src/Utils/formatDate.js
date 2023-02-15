const formatDate = (date) => {
	if (!date || typeof date !== "string" || isNaN(Date.parse(date))) return "";
	const newDate = new Date(date);
	newDate.setUTCHours(newDate.getUTCHours() + 2); //GMT+2
	const year = newDate.getUTCFullYear();
	const month = String(newDate.getUTCMonth() + 1).padStart(2, "0");
	const day = String(newDate.getUTCDate()).padStart(2, "0");
	const hours = String(newDate.getUTCHours()).padStart(2, "0");
	const minutes = String(newDate.getUTCMinutes()).padStart(2, "0");

	return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default formatDate;
