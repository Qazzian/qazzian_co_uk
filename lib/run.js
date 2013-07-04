

var SiteBuilder = require('./SiteBuilder.js');


function buildSite(){
	var builder = new SiteBuilder();

	SiteBuilder;
	builder.getConfig();
	builder.getPageData();
	builder.build();
}

buildSite();