const fs = require("fs");
const path = require("path");

const isOptimized = process.argv[2] === "true";
const configPath = path.join(__dirname, "..", "optimization-config.json");

const config = { isOptimized };

console.log(`Writing config file: ${configPath}`);
console.log(`Config content: ${JSON.stringify(config)}`);

fs.writeFileSync(configPath, JSON.stringify(config));

console.log("Config file written successfully");
