import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../Constants/routes";
import { AuthContext } from "../../Context/authContext";
import ListComponent from "../ListComponent/ListComponent";

const MinimizedHeader = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const auth = useContext(AuthContext);

	const closeMenu = () => {
		setTimeout(() => {
			document.querySelector(".navigation__checkbox").checked = false;
			setIsMenuOpen(false);
		}, 500);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<div className="navigation">
				<div>
					<h3 className="navigation__WebName">Rain of Thoughts</h3>
				</div>
				<input type="checkbox" onClick={toggleMenu} className="navigation__checkbox" id="navi-toggle" />

				<label htmlFor="navi-toggle" className="navigation__button">
					<span className="navigation__icon">&nbsp;</span>
				</label>

				<div className="navigation__background">
            &nbsp;
				</div>

				<div className="navigation__nav">
					<ul className={`navigation__list ${isMenuOpen ? "navigation__list--active" : ""}`}>
						<ListComponent 
							Route={appRoutes.HOMEPAGE} 
							RouteText="Homepage" 
							closeMenu={closeMenu} 
						/>
						<ListComponent 
							LoggedInReq="true" 
							Route={`${appRoutes.USERTHOUGHTS.replace(":username",`${auth.username}`)}`} 
							RouteText="My Thoughts"
							closeMenu={closeMenu} 
						/>
						<ListComponent 
							Route={appRoutes.ALLTHOUGHTS} 
							RouteText="All Thoughts" 
							closeMenu={closeMenu} 
						/>
						<ListComponent 
							Route={appRoutes.TOP9LIST} 
							RouteText="Top 9 List" 
							closeMenu={closeMenu} 
						/>
						<ListComponent 
							LoggedInReq="true"
							Route={appRoutes.NEWTHOUGHT} 
							RouteText="New Thought" 
							closeMenu={closeMenu} 
						/>
						{auth.isLoggedIn && (
							<li onClick={auth.logout} className="navigation__item">
								<Link 
									to={appRoutes.ALLTHOUGHTS} 
									onClick={closeMenu} 
									className="navigation__link">
									Logout
								</Link>
							</li>
						)}
						<ListComponent 
							LoggedInReq="false" 
							Route={appRoutes.AUTH} 
							RouteText="Login" 
							closeMenu={closeMenu} />
					</ul>
				</div>
			</div>
		</>
	);
};

export default MinimizedHeader;