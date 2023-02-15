import React, {useContext, useEffect} from "react";
import { MessageContext } from "../../Context/messageContext";

const Message = () => {
	const {message, setMessage } = useContext(MessageContext);

	const onMessageClear = () => {
		setMessage("");
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage("");
		}, 2500);
		return () => clearTimeout(timer);
	}, [message]);


	return (
		<>
			{message && (
				<div className="message">
					<p className="message__text">
						{message}
					</p>
					<button 
						className={"btn btn--red"} 
						onClick={onMessageClear}>
						OK
					</button>
				</div>
			)}
		</>
	);
};

export default Message;
