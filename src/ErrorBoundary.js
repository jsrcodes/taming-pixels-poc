import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const errorHandler = (error, errorInfo) => {
			console.log("Error:", error, errorInfo);
			setHasError(true);
		};

		window.addEventListener("error", errorHandler);

		return () => {
			window.removeEventListener("error", errorHandler);
		};
	}, []);

	if (hasError) {
		return <h1>Something went wrong.</h1>;
	}

	return children;
};

export default ErrorBoundary;
