

var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	Page = require('./Page.js'),
	Parser;


Parser = (function(PageParser){

	"use strict";

	var PAGE_PATH = __dirname + '/../templates/pages';

	PageParser = function(baseDir){
		this.baseDir = baseDir;
	};
	
	PageParser.prototype = {


		/* TODO
			Need to look at the contents of the base dir
			for all .json files create a page Object
			attache the .mustache path & filename to the object.
			If there is a folder with the same name attach it.

			If there is a folder but not a .jaon file ????
			if there is a .mustache but not a .json ???

			For the includes, just create a refrence to the template
		*/

		parsePages: function(){
			var pages = {}, page, fileList, i, l;
			// TODO Need to put the path in config 
			fileList = fs.readdirSync(PAGE_PATH);

			for (i=0, l=fileList.length; i<l; i++) {
				if (fileList[i].match(/\.json$/)) {
					page = processPage(PAGE_PATH+'/'+fileList[i]);
					if (!page) { continue; }
					pages[page.id] = page;	
				}
			}

			return pages;
		},


		parseIncludes: function(){
			var includes = {};
			return includes;
		}
	};

	/**
	 * @param filename - The full path name of the page's json file
	 */
	function processPage(filename){
		var page = new Page({
					path: filename,
					filename: path.basename(filename, '.json'),
				});

		try {
			page.json = fs.readFileSync(filename, 'utf8');
			page.config = JSON.parse(page.json);
			page.templatePath = filename.replace(/\.json$/, '.mustache');
			page.template = getTemplate(page.templatePath);
			

			return page;
		}
		catch (err) {
			util.error("Error loading page " + filename + ':', err, err.stack);
		}

		return null;
	}

	function getTemplate(path){
		try {
			return fs.readFileSync(path, 'utf8');
		}
		catch (error) {
			 util.error("Could not load template '" + path + "': ", error);
		}
	}






return PageParser;

})(Parser);

module.exports = Parser;



