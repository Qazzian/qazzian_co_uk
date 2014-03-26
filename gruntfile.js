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

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.loadTasks('grunt/bower-deps.js');


	grunt.registerTask('collectDeps', ['copy']);

	grunt.registerTask('default', ['clean', 'collectDeps', 'less']);
};