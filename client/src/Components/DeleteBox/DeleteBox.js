import React, {useContext} from "react";
import { AuthContext } from "../../Context/authContext";
import TrashBin from "../../Assets/Img/trashBin.png";

const DeleteBox = ({Username, openModal, classNameStyle}) => {
	const { isLoggedIn, username } = useContext(AuthContext);

	return (
		<>
			{isLoggedIn & Username == username ? (
				<div onClick={() => openModal()} 
					className={classNameStyle}>
					<img 
						src={TrashBin} 
						alt="trashBinIcon" 
					/>
				</div>
			) : null}
		</>
	);
};

export default DeleteBox;