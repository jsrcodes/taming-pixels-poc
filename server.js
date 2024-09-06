const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const path = require("path");
const webpackConfig = require("./webpack.config.js");

const app = express();
const port = process.env.PORT || 3000;

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));

// Serve index.html for all routes
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
