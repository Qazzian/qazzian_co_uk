var fs = require('fs');

module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            config: {
            },
            files: {
                'styles.css': fs.join('templates', 'assets', 'less', 'manifest.less')
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['less']);
};