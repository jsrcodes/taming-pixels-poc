const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: "production",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
	optimization: {
		minimizer: [new TerserPlugin()],
	},
	devtool: "source-map",
};
