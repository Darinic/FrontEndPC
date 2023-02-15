

export function calculateMaxPages (totalThoughts, thoughtsPerPage) {
	return Math.ceil(totalThoughts / thoughtsPerPage);
}
