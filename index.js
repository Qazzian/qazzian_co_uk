#! /usr/bin/env node
/**
 * Build the site.

 The intention of this file is to 
 read the config file
 generate the makefile 
 call make

 alternativly we could just make the various system calls in node based on the config
 but having a handy prebuilt makefile could be useful for production

 */

var fs = require('fs'),
	path = require('path'),
	siteConfig = require('./lib/siteConfig.js'),
	Mustache = require('mustache');

var BOOSTWATCH_DIR = "subModules/bootswatch/";

(function(){
	renderMakeFile();
	runMake();

})();

function renderMakeFile() {
	var context = siteConfig.get(),
		makeTemplate = fs.readFileSync('./Makefile.mustache', 'utf8'),
		makeContents;
	
	context = processBootstrapOptions(context);
	makeContents = Mustache.render(makeTemplate, context);
	// console.log("Make File: \n", makeContents);
	fs.writeFileSync('./Makefile', makeContents, 'utf8');
}

function processBootstrapOptions(context){
	if (context.bootswatchTheme){
		context.bootstrapVariablesFile = path.join(__dirname, BOOSTWATCH_DIR, context.bootswatchTheme, 'variables.less');
		context.extraLessFiles = [{
			dir: path.join(__dirname, BOOSTWATCH_DIR, context.bootswatchTheme),
			file: 'bootswatch.less'
		}];
	}

	return context;
}

function runMake(){
	var sys = require('sys'),
		exec = require('child_process').exec,
		child;
 
	// executes `pwd`
	child = exec("make", function (error, stdout, stderr) {
		if (stdout) sys.print(stdout + '\n');
		if (stderr) sys.print('Errors: ' + stderr + '\n');
		if (error !== null) {
			sys.error('Make error: ' + error + '\n');
		}
	});
}
