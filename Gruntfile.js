/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      version: '<%= pkg.version %>',
      banner: 
        '// Kendo-Backbone\n' +
        '// --------------\n' + 
        '// v<%= pkg.version %>\n' +
        '//\n' + 
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Telerik. All Rights Reserved.\n' +
        '// Distributed under Apache 2.0 license\n' +
        '//\n' + 
        '// http://kendoui.com\n' +
        '\n'
    },

    lint: {
      files: ['src/*.js']
    },

    preprocess: {
      web: {
        files: {
          'build/web/kendo.backbone.js' : 'src/web/build/kendo.backbone.js'
        }
      }
    },

    concat: {
      options: {
        banner: "<%= meta.banner %>"
      },
      web: {
        src: 'build/web/kendo.backbone.js',
        dest: 'build/web/kendo.backbone.js'
      }
    },

    uglify : {
      options: {
        banner: "<%= meta.banner %>"
      },
      web : {
        src : 'build/web/kendo.backbone.js',
        dest : 'build/web/kendo.backbone.min.js',
        options : {
          sourceMap : 'build/web/kendo.backbone.map',
          sourceMappingURL : 'kendo.backbone.map',
          sourceMapPrefix : 2,
        }
      }
    },

    jasmine : {
      options : {
        helpers : 'specs/helpers/*.js',
        specs : 'specs/**/*.spec.js',
        vendor : [
          'vendor/jquery.js',
          'vendor/underscore.js',
          'vendor/backbone.js',
          'vendor/backbone.localstorage.js',
          'vendor/kendo.all.min.js'
        ],
      },
      webCoverage : {
        src : '<%= jasmine.web.src %>',
        options : {
          template : require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'reports/coverage.json',
            report: 'reports/coverage'
          }
        }
      },
      web : {
        src : [
          'src/web/build/kendo.backbone.js',
          'src/web/**/*.js'
        ]
      }
    },

    jshint: {
      options: {
        jshintrc : '.jshintrc'
      },
      web : [ 'src/web/*.js' ]
    },
    plato: {
      web : {
        src : 'src/**/*.js',
        dest : 'reports',
        options : {
          jshint : grunt.file.readJSON('.jshintrc')
        }
      }
    },
    watch: {
      web : {
        files : ['src/web/*.js', 'specs/web/*.js'],
        tasks : ['jshint', 'jasmine:web']
      },
      server: {
        files : ['src/web/*.js', 'specs/web/*.js'],
        tasks : ['jasmine:web:build']
      }
    },

    connect: {
      server: {
        options: {
          port: 8888
        }
      }
    }
  });

  // load plugins

  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-plato');

  // register tasks
  
  grunt.registerTask('default', ['jshint', 'preprocess', 'concat', 'uglify']);
  grunt.registerTask('test', ['jshint', 'jasmine:web']);
  grunt.registerTask('dev', ['test', 'watch:web']);
  grunt.registerTask('server', ['jasmine:web:build', 'connect:server', 'watch:server']);

};
