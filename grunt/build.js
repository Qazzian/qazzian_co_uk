/**
 * Created by Ian on 27/03/2014.
 */

var buildRunner = require('../lib/run.js');

module.exports = function(grunt){

	grunt.registerTask('cmsBuildHtml', 'Compiles the json and mustache templates into static HTML files.', function(){
		buildRunner();

	});

};