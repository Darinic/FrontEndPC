/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useNavigate } from "react-router-dom";
import ThinkingMan from "../../Assets/Img/thinking.png";
import umbrella from "../../Assets/Svg/umbrella.svg";
import { appRoutes } from "../../Constants/routes";

const Homepage = () => {
	const navigate = useNavigate();

	const navigateToAllThoughts = () => {
		navigate(appRoutes.ALLTHOUGHTS);
	};

	return (
		<div className="homepage">
			<div className="homepage__intro">
				<h1 className="heading__primary homepage__title">
					Rain of <br /> thoughts
				</h1>
				<p className="homepage__text">
					Have you ever experienced those miniature epiphanies at{" "}
					<span className="homepage__text--span">Present</span> Connection, at
					the shower, while not being able to fall asleep or just strolling
					through the park?
				</p>
				<p className="homepage__text">
					Perhaps you couldn't find whom to share them with?! Well... No
					problem, that's what Rain Of Thoughts is for! Share with your
					colleagues and we'll listen.
				</p>
				<p className="homepage__text">
					Check out what your colleagues have posted, just don't forget the
					umbrella
					<img src={umbrella} alt="umbrella logo" className="homepage__umbrellaLogo" />
				</p>
				<div className="u-center">
					<button onClick={navigateToAllThoughts} className="btn btn--white btn--animated">
						Click here
					</button>
				</div>
			</div>
			<img src={ThinkingMan} alt="Thinking man" className="homepage__image" />
		</div>
	);
};

export default Homepage;
