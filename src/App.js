import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ProgressBar from "./components/ProgressBar";
import { UserProvider, useUser } from "./contexts/UserContext";
import {
	initializeGoogleAnalytics,
	initializeFacebookPixel,
	initializeSnapchatPixel,
	initializeTensorFlow,
	initializeTwitterPixel,
	setUserIdForAnalytics,
} from "./utils/analytics";

const AppContent = () => {
	const { user } = useUser();
	const [progress, setProgress] = useState(0);
	const [mainContentLoaded, setMainContentLoaded] = useState(false);
	const [scriptsInitialized, setScriptsInitialized] = useState({
		ga: false,
		fb: false,
		snapchat: false,
		tensorflow: false,
		twitter: false,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					clearInterval(timer);
					setMainContentLoaded(true);
					return 100;
				}
				return Math.min(oldProgress + 10, 100);
			});
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		if (mainContentLoaded) {
			const initializeScripts = async () => {
				await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay to simulate network latency
				initializeGoogleAnalytics();
				setScriptsInitialized((prev) => ({ ...prev, ga: true }));

				await new Promise((resolve) => setTimeout(resolve, 500));
				initializeFacebookPixel();
				setScriptsInitialized((prev) => ({ ...prev, fb: true }));

				await new Promise((resolve) => setTimeout(resolve, 500));
				initializeSnapchatPixel();
				setScriptsInitialized((prev) => ({ ...prev, snapchat: true }));

				await new Promise((resolve) => setTimeout(resolve, 500));
				initializeTensorFlow();
				setScriptsInitialized((prev) => ({ ...prev, tensorflow: true }));

				await new Promise((resolve) => setTimeout(resolve, 500));
				initializeTwitterPixel();
				setScriptsInitialized((prev) => ({ ...prev, twitter: true }));
			};

			initializeScripts();
		}
	}, [mainContentLoaded]);

	useEffect(() => {
		if (user) {
			setUserIdForAnalytics(user.id);
		} else {
			setUserIdForAnalytics(null);
		}
	}, [user]);

	return (
		<Router>
			<div>
				<h1>Analytics Optimizer PoC</h1>
				{!mainContentLoaded && (
					<div>
						<p>Loading main content...</p>
						<ProgressBar progress={progress} />
					</div>
				)}
				{mainContentLoaded && (
					<>
						<nav>
							<ul>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/about">About</Link>
								</li>
							</ul>
						</nav>
						<div>
							<h2>Script Loading Status:</h2>
							<ul>
								<li>
									Google Analytics:{" "}
									{scriptsInitialized.ga ? "Loaded" : "Not Loaded"}
								</li>
								<li>
									Facebook Pixel:{" "}
									{scriptsInitialized.fb ? "Loaded" : "Not Loaded"}
								</li>
								<li>
									Snapchat Pixel:{" "}
									{scriptsInitialized.snapchat ? "Loaded" : "Not Loaded"}
								</li>
								<li>
									TensorFlow.js:{" "}
									{scriptsInitialized.tensorflow ? "Loaded" : "Not Loaded"}
								</li>
								<li>
									Twitter Pixel:{" "}
									{scriptsInitialized.twitter ? "Loaded" : "Not Loaded"}
								</li>
							</ul>
						</div>
						<Routes>
							<Route path="/" element={<Layout />}>
								<Route index element={<Home />} />
								<Route path="about" element={<About />} />
							</Route>
						</Routes>
					</>
				)}
			</div>
		</Router>
	);
};

const App = () => (
	<UserProvider>
		<AppContent />
	</UserProvider>
);

export default App;
