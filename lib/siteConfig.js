
var fs = require('fs');

var configFileLocation = __dirname+'/../config.json',
	configData = {},
	siteConfig;

function loadConfig(filename){
	var configString = fs.readFileSync(filename, 'utf8');
	return JSON.parse(configString);
}


siteConfig = {
	get:function(key){
		if (!key) {
			return configData;
		}

		if (configData.hasOwnProperty(key)) {
			return configData[key];
		}
	}
}

configData = loadConfig(configFileLocation);


module.exports = siteConfig;