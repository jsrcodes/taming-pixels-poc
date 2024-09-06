import React from "react";
import { Outlet } from "react-router-dom";
import Script from "./Script";
import { initializeFacebookPixel } from "../utils/analytics";

const Layout = () => {
	return (
		<>
			<Outlet />
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
				strategy="lazyOnload"
			/>
			<Script
				src="https://connect.facebook.net/en_US/fbevents.js"
				strategy="lazyOnload"
				preInit={initializeFacebookPixel}
			/>
			<Script
				src="https://sc-static.net/scevent.min.js"
				strategy="lazyOnload"
			/>
			<Script
				src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"
				strategy="lazyOnload"
			/>
			<Script
				src="https://static.ads-twitter.com/uwt.js"
				strategy="lazyOnload"
			/>
		</>
	);
};

export default Layout;
