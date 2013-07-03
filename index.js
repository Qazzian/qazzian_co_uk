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
	siteConfig = require('./lib/siteConfig.js'),
	Mustache = require('mustache');

(function(){
	renderMakeFile();
	runMake();

})();

function renderMakeFile() {
	var context = siteConfig.get(),
		makeTemplate = fs.readFileSync('./Makefile.mustache', 'utf8'),
		makeContents;
	
	makeContents = Mustache.render(makeTemplate, context);
	// console.log("Make File: \n", makeContents);
	fs.writeFileSync('./Makefile', makeContents, 'utf8');
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
