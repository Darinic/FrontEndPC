import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";

const ListComponent = ({LoggedInReq = null, Route, RouteText, closeMenu  }) => {
	const auth = useContext(AuthContext);

	let link = (
		<li className="navigation__item">
			<Link 
				onClick={closeMenu} 
				to={Route} 
				className="navigation__link">
				{RouteText}
			</Link>
		</li>);

	if(LoggedInReq === "true" && !auth.isLoggedIn) 
	{
		return null;
	}
	else if(LoggedInReq === "false" && auth.isLoggedIn) 
	{
		return null;
	}
	else {
		return link;
	}
};

export default ListComponent;
