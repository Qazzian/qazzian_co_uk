 /**
 * Created by Ian on 25/03/14.
 */

var _ = require('underscore');

 module.exports = function(grunt){

	 function getFileOpts(task, file) {
		 return _.extend({}, task.options.fileOpts, file);
	 }

	 function loadDeps(task){
		 this.files.forEach(function(file){
			 var opts = getFileOpts(task, file);


		 });
	 }

	 function cleanDeps(task){

	 }


	 grunt.registerMultiTask('BowerDeps', 'Load all dependancies from the list of bower installs', function(){
		if (this.target === 'clean') {
			cleanDeps(this);
		}
		 else {
			loadDeps(this);
		}


	 });

 };