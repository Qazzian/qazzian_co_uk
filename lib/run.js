

var SiteBuilder = require('./sitebuilder.js');


function buildSite(){
	var builder = new SiteBuilder();

	SiteBuilder;
	builder.getConfig();
	builder.getPageData();
	builder.build();
}

buildSite();