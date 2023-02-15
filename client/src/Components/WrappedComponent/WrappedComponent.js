import React from "react";
import Header from "../Header/Header";
import Message from "../Message/Message";

const WrappedComponent = (props) => {
	return (
		<div className="container">
			<Header />
			<Message />
			{props.children}
		</div>
	);
};

export default WrappedComponent;
