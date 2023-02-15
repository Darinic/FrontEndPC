import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import edit from "../../Assets/Img/EditIcon.png";
import { appRoutes } from "../../Constants/routes";

const EditableBox = ({userName, id}) => {
	const { username } = useContext(AuthContext);
	return (
		<>
			{userName === username ? (
				<Link 
					to={`${appRoutes.EDITTHOUGHT.replace(":id", `${id}`)}`} 
					className="editableBox__editable">
					<img 
						src={edit} 
						alt="edit" 
						className="editableBox__editIcon"
					/>
				</Link>
			) : null}
		</>
	);

};

export default EditableBox;