#! /usr/bin/env node

/**
 * Build the static site
 */


var siteConfig = require('./siteConfig.js'),
	PageParser = require('./PageParser.js')
	Mustache = require('mustache');;

var SiteBuilder = function(){
	this.parser = null;
	this.data = {
			config: this.getConfig(),
			layout: this.getLayout(),
			pages: this.getPageData(),
			page: null
		};
};

SiteBuilder.prototype = {
	build: function(){
		this.data.includes = this.getIncludes();
		this.pageData = this.getPageData();

		// For each page in pageData
		// compile the data for the page
		// build the template

		console.log("\n\nSiteBuilder Data:\n", JSON.stringify(this.data));
		this.output = this.buildPages();
		return true;
	},

	getConfig: function(){
		return siteConfig.get();
	},

	getLayout: function(){
		return this.getPageParser().getLayout();
	},

	getPageData: function(){
		return this.getPageParser().parsePages();
	},

	getIncludes: function(){
		return this.getPageParser().getIncludes();
	},

	getPageParser: function(){
		if (!this.parser) {
			this.parser = new PageParser();
		}
		return this.parser;
	},

	buildPages: function(){
		var output = {}, 
			layout = this.getLayout(),
			page;

		for (var i = this.data.pages.length - 1; i >= 0; i--) {
			page = this.data.page = this.data.pages[i];
			console.log("\n\nRender template: \n", layout, "\n\nWith data: \n", this.data);
			if (page.template){
				try {
					this.data.includes.page = page.template;
					output[page.filename] = Mustache.render(layout, this.data, this.data.includes);
				}
				catch (error) {
					console.error(error);
				}
				
			}
		};

		console.log("\n\nHTML OUTPUT: \n", output);
		return output;
	},

	saveOutput: function(output){

	}
};



module.exports = SiteBuilder;

