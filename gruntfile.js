var fs = require('fs');

module.exports = function (grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: ['dist', 'build'],

		copy: {
			bowerDeps: {
				config: {
					encoding: 'utf8',
					filter: 'isFile'
				},
				files: [
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components/jquery/dist/',
						src: ['jquery.min.*'],
						dest: 'dist/assets/js/lib/'
					},
					{
						expand: true,
						flatten: true,
						cwd: 'bower_components/bootstrap/dist/',
						src: ['bootstrap.min.js*'],
						dest: 'dist/assets/js/lib/'
					}
				]
			},
			assets: {
				config: {
					encoding: 'utf8',
					filter: 'isFile'
				},
				files: [
					{
						expand: true,
						cwd: 'templates/',
						src: 'assets/**',
						dest: 'dist'
					}
				]
			}

		},

		less: {
			dev: {
				options: {
					paths: ["bower_components/bootstrap/less/"]
				},
				files: {
					'dist/assets/css/manifest.css': 'templates/assets/less/manifest.less'
				}
			}
		}


	});

	grunt.registerTask('bowerInstall', 'install the frontend dependencies', function() {
		// adapted from http://www.dzone.com/snippets/execute-unix-command-nodejs
		var exec = require('child_process').exec,
				sys  = require('sys');

		function puts(error, stdout, stderr) { console.log(stdout); sys.puts(stdout) }

		// assuming this command is run from the root of the repo
		exec('bower install', puts);
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.loadTasks('grunt');

	grunt.registerTask('default', 'Run as part of normal development of the site templates', ['clean', 'copy', 'less', 'cmsBuildHtml']);
	grunt.registerTask('install', 'Run when first installing this cms.', ['bowerInstall', 'copy', 'less', 'cmsBuildHtml']);
	grunt.registerTask('update', 'Run if any of the bower dependencies change.', ['clean', 'bowerInstall', 'copy', 'less', 'cmsBuildHtml']);

};