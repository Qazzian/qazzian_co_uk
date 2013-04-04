#! /usr/bin/env node

/**
 * Create a menu structure based on the pages found
 */


var siteConfig = require('./siteConfig.js');


var homeLocation = 'home';

var MenuBuilder = function(pageData){
	this.pageData = null;
	this.menuData = null;
	this.setPageData(pageData);

};

MenuBuilder.prototype = {

	setPageData: function(pageData){
		this.pageData = pageData;
		this.processPageData();
	},

	processPageData: function(){
		this.menuData = []

		

	},

	getTemplateContext: function(){
		return this.menuData;
	}

};


module.exports = MenuBuilder;