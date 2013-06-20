
var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	Page = require('./Page.js'),
	siteConfig = require('./siteConfig.js'),
	Parser;


Parser = (function(PageParser){

	"use strict";

	var LAYOUT_PATH = __dirname + '/../templates/layout.mustache';
	var PAGE_PATH = __dirname + '/../templates/pages';
	var INCLUDE_PATH = __dirname + '/../templates/includes';

	PageParser = function(baseDir){
		this.baseDir = baseDir;
	};
	
	PageParser.prototype = {


		/* TODO
			Need to look at the contents of the base dir
			for all .json files create a page Object
			attache the .mustache path & filename to the object.
			If there is a folder with the same name attach it.

			If there is a folder but not a .json file ????
			if there is a .mustache but not a .json ???

			For the includes, just create a refrence to the template
		*/

		parsePages: function(path){
			var pages = [], page, fileList, i, l;
			path = path || PAGE_PATH;
			fileList = fs.readdirSync(path);

			for (i=0, l=fileList.length; i<l; i++) {
				if (fileList[i].match(/\.json$/)) {
					page = processPage(path+'/'+fileList[i]);
					if (!page) { continue; }
					if (siteConfig.get('defaultHome') == page.filename){
						pages.unshift(page);
					}
					else {
						pages.push(page);	
					}
				}
			}

			return pages;
		},


		getIncludes: function(){
			var includes = {}, fileList, filename, name, template, i;

			fileList = fs.readdirSync(INCLUDE_PATH);
			for (i = fileList.length - 1; i >= 0; i--) {
				if (fileList[i].match(/\.mustache$/)) {
					filename = fileList[i];
					name = path.basename(filename, '.mustache');
					includes[name] = fs.readFileSync(INCLUDE_PATH+'/'+filename, 'utf8');
				}
			};

			return includes;
		},

		getLayout: function(){
			return fs.readFileSync(LAYOUT_PATH, 'utf8');
		},


		/**
		 * From the given filename, check if there is a folder with child pages
		 */
		processChildren: function(filename) {
			var children;

			console.log("process children for ", filename);
			if (!fs.existsSync(filename)) {
				return;
			}

			children = this.parsePages(filename);
			console.log("child data: ", children);
			return children;
		}
	};

	/**
	 * @param filename - The full path name of the page's json file
	 */
	function processPage(filename){
		var config,
			page = new Page({
				path: filename,
				filename: path.basename(filename, '.json'),
			});

		try {
			page.json = fs.readFileSync(filename, 'utf8');
			config = JSON.parse(page.json);

			for (var k in config) {
				page[k] = config[k];
			}

			page.templatePath = filename.replace(/\.json$/, '.mustache');
			page.template = getTemplate(page.templatePath);
			page.url = '/' + page.filename + '.html';
			

			return page;
		}
		catch (err) {
			util.error("Error loading page " + filename + ':', err, err.stack);
		}

		return;
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



