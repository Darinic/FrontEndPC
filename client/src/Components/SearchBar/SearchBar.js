import React from "react";

const SearchBar = ({handleSearch}) => {
	return (
		<div className="searchbar__container">
			<input
				className="searchbar__input"
				type="text"
				placeholder="# Search"
				onChange={handleSearch}
				maxLength="10"
			/>

		</div>
	);
};

export default SearchBar;