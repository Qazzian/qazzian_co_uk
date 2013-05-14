#! /usr/bin/env node

/**
 * Build the static site
 */


var siteConfig = require('./siteConfig.js'),
	PageParser = require('./PageParser.js'),
	Mustache = require('mustache'),
	fs = require('fs');


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

		//console.log("\n\nSiteBuilder Data:\n", JSON.stringify(this.data));
		this.output = this.buildPages();
		this.saveOutput(this.output);
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
			//console.log("\n\nRender template: \n", layout, "\n\nWith data: \n", this.data);
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

		return output;
	},

	/**
	 * Save all the pages that have been successfully parsed and rendered into static HTML files
	 */
	saveOutput: function(output){
		var buildPath = __dirname +'/../'+ siteConfig.get('buildPath') + '/';
		for (var path in output) {
			fs.writeFileSync(buildPath+path+'.html', output[path], 'utf8');
		}
	}
};



module.exports = SiteBuilder;

