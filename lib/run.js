

var SiteBuilder = require('./SiteBuilder.js');


function buildSite(){
	var builder = new SiteBuilder();

	SiteBuilder;
	builder.getConfig();
	builder.getPageData();
	builder.build();
}

// If called from the command line
if(require.main === module) {
	buildSite();
}

// Make the function available to external modules.
module.exports = buildSite;


