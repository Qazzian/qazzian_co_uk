#! /usr/bin/env node

/**
 * Build the static site
 */


var siteConfig = require('./siteConfig.js'),
	PageParser = require('./PageParser.js');

var SiteBuilder = function(){
	this.data = {
			config: this.getConfig(),
			site: this.getPageData(),
			page: null
		};
		console.log("SiteBuilder Data", this.data);
};

SiteBuilder.prototype = {
	build: function(){
		/**
			get site wide config.
			get all page data.
			Compile the includes.
			Compile individual pages.
		**/

		return true;
	},

	getConfig: function(){
		return siteConfig.get();
	},

	getPageData: function(){
		var parser = new PageParser();
		return parser.parsePages();
	},

	getIncludes: function(){

	},

	buildPage: function(pageId){
		/**
			TODO:
				Load the template and get the data ready
		*/
	}
};



module.exports = SiteBuilder;

