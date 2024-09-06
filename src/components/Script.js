import React, { useEffect } from "react";
import useScript from "../hooks/useScript";

const Script = ({
	src,
	strategy = "afterInteractive",
	onLoad,
	onError,
	preInit,
}) => {
	const status = useScript(src, strategy);

	useEffect(() => {
		if (preInit) {
			preInit();
		}
		if (status === "ready" && onLoad) {
			// Add a small delay to simulate script initialization
			setTimeout(() => {
				try {
					onLoad();
				} catch (error) {
					console.error(`Error executing onLoad for ${src}:`, error);
					if (onError) onError(error);
				}
			}, 500);
		} else if (status === "error" && onError) {
			onError(new Error(`Failed to load script: ${src}`));
		}
	}, [status, onLoad, onError, src, preInit]);

	return null;
};

export default Script;
