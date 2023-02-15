const appRoutes = {
	HOMEPAGE: "/",
	ALLTHOUGHTS: "/allthoughts",
	NEWTHOUGHT: "/newthought",
	THOUGHTDETAILS: "/thoughtdetails/:id",
	AUTH: "/auth",
	SIGNUP: "/signup",
	TOP9LIST: "/top9list",
	FORGOTPASSWORD: "/forgotpassword",
	INCORRECTROUTE: "*",
	RESETPASSWORD: "/resetpassword/:email/:token",
	USERTHOUGHTS: "/UserThoughts/:username",
	EDITTHOUGHT: "/edit/:id",
};

const {REACT_APP_BACKEND_PATH} = process.env;

const APIRoutes = {
	THOUGHTS: `${REACT_APP_BACKEND_PATH}Thought`,
	NEWTHOUGHT: `${REACT_APP_BACKEND_PATH}thought/createThought`,
	LOGIN: `${REACT_APP_BACKEND_PATH}auth/login`,
	SIGNUP: `${REACT_APP_BACKEND_PATH}auth/register`,
	FORGOTPASSWORD: `${REACT_APP_BACKEND_PATH}Auth/ForgotPassword`,
	RESETPASSWORD: `${REACT_APP_BACKEND_PATH}Auth/ResetPassword`,
	LIKE: `${REACT_APP_BACKEND_PATH}Like`,
	TOP9ALLTIME: `${REACT_APP_BACKEND_PATH}Thought/Top9AllTime`,
	TOP9LASTMONTH: `${REACT_APP_BACKEND_PATH}Thought/Top9Last30Days`,
	TOP9LASTWEEK: `${REACT_APP_BACKEND_PATH}Thought/Top9LastWeek`,
	USERTHOUGHTS: `${REACT_APP_BACKEND_PATH}Thought/user`,
	THOUGHTSEARCH: `${REACT_APP_BACKEND_PATH}Thought/search`,
	POSTCOMMENT: `${REACT_APP_BACKEND_PATH}ThoughtComment`,
	DELETECOMMENT: `${REACT_APP_BACKEND_PATH}ThoughtComment`,
};

export { appRoutes, APIRoutes };