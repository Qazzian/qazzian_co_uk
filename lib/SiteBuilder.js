#! /usr/bin/env node

/**
 * Build the static site
 */


var siteConfig = require('./siteConfig.js'),
	PageParser = require('./PageParser.js'),
	Mustache = require('mustache'),
	fs = require('fs'),
	pathUtil = require('path'),
	util = require('util');


var SiteBuilder = function(){
	this.parser = null;
	this.data = {
			buildTime: new Date(),
			config: this.getConfig(),
			layout: this.getLayout(),
			pages: this.getPageData(),
			page: null
		};

	this.data.pageIndex = this.getPageIndex();
	this.output = {};
};

SiteBuilder.prototype = {
	build: function(){
		this.data.includes = this.getIncludes();
		// this.pageData = this.getPageData();

		this.output = {};
		this.buildPages();
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

	getPageIndex: function(){
		var index = {};
		this.addToIndex(this.data.pages, index);
		return index;
	},

	addToIndex: function(pages, index){
		var i = 0,
			l = pages.length;

		for (; i<l; i++) {
			index[this.pagePathToIndex(pages[i].url)] = pages[i];
			if (pages[i].children.length > 0) {
				this.addToIndex(pages[i].children, index);
			}
		}
	},

	pagePathToIndex: function(path){
		var out = path.slice(1);
		out = out.replace('/', '_');
		out = out.replace(/\.html$/, '');
		return out;
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
		var output = {};
		
		this.data.layout = this.getLayout();

		for (var i = this.data.pages.length - 1; i >= 0; i--) {

			this.data.page = this.data.pages[i];
			this.buildPage(this.data);
		}

		return output;
	},


	/**
	 * NOTE: modifes data
	 */
	buildPage: function(data){

		var page = data.page,
			output;
		if (page.template){
			try {
				// pre render setup
				page.selected = true;
				data.includes.page = page.template;
				try{
					page.html = Mustache.render(data.layout, data, data.includes);
					this.output[page.filename] = (this.data.page.html);
				}
				catch (error) {
					util.error("rendering error " + page.filename, error);
				}
				
				
				// post render tear own
				page.selected = false;
			}
			catch (error) {
				util.error(error);
			}
		}

		if (page.children.length > 0) {
			this.buildChildren(page, data);
		}
	},

	/**
	 * NOTE: data is being modified so we should reset it back to how it is when passed in, or copy it?
	 */
	buildChildren: function(page, data){
		if (!page.children || !page.children.length) { return; }

		var i,l;

		for (i=0,l=page.children.length; i<l; i++) {
			data.page = page.children[i];
			this.buildPage(data);
		}

		data.page = page;

	},

	buildFavicon: function(){
		/** TODO load the template
		 * compile the template with the standard build config
		 * Make sure there's no page set in the context
		 * save the html file
		 * run phantomjs
		 */

	},

	/**
	 * Save all the pages that have been successfully parsed and rendered into static HTML files
	 */
	saveOutput: function(output){
		var buildPath = __dirname +'/../'+ siteConfig.get('buildPath') + '/',
			filename, dirname;
		for (var path in output) {
			filename = buildPath+path+'.html';
			dirname = pathUtil.dirname(filename);
			if (!fs.existsSync(dirname)) {
				fs.mkdirSync(dirname);
			}
			fs.writeFileSync(filename, output[path], 'utf8');
		}
	}
};


module.exports = SiteBuilder;
