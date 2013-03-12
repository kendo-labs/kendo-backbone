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
        '// Distributed under MIT license\n' +
        '//\n' + 
        '// http://kendoui.com\n' +
        '\n'
    },

    lint: {
      files: ['src/*.js']
    },

    preprocess: {
      build: {
        files: {
          'build/kendo.backbone.js' : 'src/build/kendo.backbone.js'
        }
      }
    },

    concat: {
      options: {
        banner: "<%= meta.banner %>"
      },
      build: {
        src: 'build/kendo.backbone.js',
        dest: 'build/kendo.backbone.js'
      }
    },

    uglify : {
      options: {
        banner: "<%= meta.banner %>"
      },
      build : {
        src : 'build/kendo.backbone.js',
        dest : 'build/kendo.backbone.min.js',
        options : {
          sourceMap : 'build/kendo.backbone.map',
          sourceMappingURL : 'kendo.backbone.map',
          sourceMapPrefix : 2,
        }
      }
    },

    jasmine : {
      options : {
        helpers : 'spec/helpers/*.js',
        specs : 'spec/**/*.spec.js',
        vendor : [
          'vendor/jquery.js',
          'vendor/underscore.js',
          'vendor/backbone.js',
          'vendor/kendo.all.min.js'
        ],
      },
      coverage : {
        src : '<%= jasmine.kendoBackbone.src %>',
        options : {
          template : require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'reports/coverage.json',
            report: 'reports/coverage'
          }
        }
      },
      kendoBackbone : {
        src : [
          'src/build/kendo.backbone.js',
          'src/*.js'
        ]
      }
    },

    jshint: {
      options: {
        jshintrc : '.jshintrc'
      },
      marionette : [ 'src/*.js' ]
    },
    plato: {
      marionette : {
        src : 'src/*.js',
        dest : 'reports',
        options : {
          jshint : grunt.file.readJSON('.jshintrc')
        }
      }
    },
    watch: {
      marionette : {
        files : ['src/*.js', 'spec/**/*.js'],
        tasks : ['jshint', 'jasmine:kendoBackbone']
      },
      server : {
        files : ['src/*.js', 'spec/**/*.js'],
        tasks : ['jasmine:kendoBackbone:build']
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
  
  grunt.registerTask('default', ['jshint', 'jasmine:coverage', 'preprocess', 'concat', 'uglify']);
  grunt.registerTask('test', ['jshint', 'jasmine:kendoBackbone']);
  grunt.registerTask('dev', ['test', 'watch:kendoBackbone']);
  grunt.registerTask('server', ['jasmine:kendoBackbone:build', 'connect:server', 'watch:server']);

};
