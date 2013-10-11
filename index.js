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

	function resolvePath(filePath){
		var file = path.resolve(filePath);
		console.log("Resolved path " + filePath + " to " + file);
		if (!fs.existsSync(file)) {
			file = '';
		}

		return file;
	}

	if (context.bootswatchTheme){
		context.bootstrapVariablesFile = path.join(__dirname, BOOSTWATCH_DIR, context.bootswatchTheme, 'variables.less');
		context.extraLessFiles = [{
			dir: path.join(__dirname, BOOSTWATCH_DIR, context.bootswatchTheme),
			file: 'bootswatch.less'
		}];
	}
	else {
		var tmpPath = '';
		if (context.bootstrapVariablesFile) {
			context.bootstrapVariablesFile = resolvePath(context.bootstrapVariablesFile);
		}
		if (context.extraLessFiles && context.extraLessFiles.length > 0) {
			for (var i=0; i<context.extraLessFiles.length; i++) {
				tmpPath = resolvePath(context.extraLessFiles[i]);
				context.extraLessFiles[i] = {
					dir: path.dirname(tmpPath),
					file: path.basename(tmpPath)
				};
			}

		}
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
