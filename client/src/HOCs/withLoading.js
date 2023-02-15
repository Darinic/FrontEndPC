import React, { useState } from "react";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

export const withLoading = (WrappedComponent) => {
	function HOC(props) {
		const [isLoading, setIsLoading] = useState(false);

		const setLoadingState = (isCompomentLoading) => {
			setIsLoading(isCompomentLoading);
		};

		return (
			<>
				{isLoading && <LoadingSpinner asOverlay />}
				<WrappedComponent {...props} setLoading={setLoadingState} />
			</>
		);
	}

	return HOC;
};

export default withLoading;
