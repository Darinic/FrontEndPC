import React from "react";
import ThoughtInput from "../Inputs/ThoughtInput/ThoughtInput";
import thinkingBubble from "../../Assets/Img/thinkingBubble.png";
import hashtag from "../../Assets/Img/hashtag.png";


const ThoughtForm = ({thought, handleInputChange, handleSubmit, heading, buttonMessage}) => {

	return (
		<div className="form">
			<form className="form__container" onSubmit={handleSubmit}>
				<h2 className="heading__secondary">{heading}</h2>
				<div className="form__inputBox">
					<label className="form__label">
						Your Thought
						<img src={thinkingBubble} alt="user logo" className="form__icon" />
					</label>
					<textarea
						className="form__input"
						type="text"
						placeholder="Your Thought (from 20 to 200 characters)"
						rows="4"
						minLength={20}
						maxLength={200}
						required
						name="thoughtMessage"
						value={thought.thoughtMessage}
						onChange={handleInputChange}
					/>
				</div>
				<div className="form__inputBox">
					<label className="form__label">
						Enter 2
						<img src={hashtag} alt="user logo" className="form__icon" />
						hashtags
					</label>
					<div className="form__inputBox--hashtags">
						<ThoughtInput
							parameter="firstHashtag"
							inputValue={thought.firstHashtag}
							handleInputChange={handleInputChange}
						/>
						<ThoughtInput
							parameter="secondHashtag"
							inputValue={thought.secondHashtag}
							handleInputChange={handleInputChange}
						/>
					</div>
				</div>
				<button className="btn btn--white" type="submit">
					{buttonMessage}
				</button>
			</form>
		</div>
	);
};

export default ThoughtForm;