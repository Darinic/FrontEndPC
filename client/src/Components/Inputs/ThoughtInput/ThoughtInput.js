import React from "react";

const ThoughtInput = ({parameter, inputValue, handleInputChange}) => {

	let placeholder;

	switch(parameter) {
	case "firstHashtag":
		placeholder = "#hashtag1";
		break;
	case "secondHashtag":
		placeholder = "#hashtag2";
		break;
	default:
		break;
	}

	return (
		<>
			<input
				className="form__input"
				type="text"
				defaultValue={inputValue}
				minLength={2}
				maxLength={10}
				required
				onChange={handleInputChange}
				placeholder={placeholder}
				name={parameter}
			/>
		</>
	);
};

export default ThoughtInput;