import { useState, useEffect } from "react";

const useScript = (src, strategy) => {
	const [status, setStatus] = useState(src ? "loading" : "idle");

	useEffect(() => {
		if (!src) {
			setStatus("idle");
			return;
		}

		let script = document.querySelector(`script[src="${src}"]`);

		const loadScript = () => {
			if (!script) {
				script = document.createElement("script");
				script.src = src;
				script.async = true;
				script.setAttribute("data-status", "loading");
				document.body.appendChild(script);

				const setAttributeFromEvent = (event) => {
					script.setAttribute(
						"data-status",
						event.type === "load" ? "ready" : "error"
					);
				};

				script.addEventListener("load", setAttributeFromEvent);
				script.addEventListener("error", setAttributeFromEvent);
			} else {
				setStatus(script.getAttribute("data-status"));
			}

			const setStateFromEvent = (event) => {
				setStatus(event.type === "load" ? "ready" : "error");
			};

			script.addEventListener("load", setStateFromEvent);
			script.addEventListener("error", setStateFromEvent);

			return () => {
				if (script) {
					script.removeEventListener("load", setStateFromEvent);
					script.removeEventListener("error", setStateFromEvent);
				}
			};
		};

		const loadScriptIdle = () => {
			if ("requestIdleCallback" in window) {
				window.requestIdleCallback(loadScript, { timeout: 2000 });
			} else {
				setTimeout(loadScript, 20);
			}
		};

		if (strategy === "afterInteractive" || strategy === "lazyOnload") {
			loadScriptIdle();
		} else {
			loadScript();
		}
	}, [src, strategy]);

	return status;
};

export default useScript;
