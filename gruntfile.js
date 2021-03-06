module.exports = function(grunt) {

  // makes  grunt.loadNpmTasks('...') not needed
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      dirs: {
        src: 'public/js'
      },

      jshint: {
        files: ['Gruntfile.js', 'dev/js/**'],
        options: {
          // options here to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true,
            document: true
          }
        }
      },

      clean: {
          build: ['public/**/**'],
          between_build: ['public/js/lib/**', 'public/js/app.js']
      },

      copy: {
        main: {
          files: [
            // includes files within path
            { expand: true, flatten: true, src: ['bower_components/backbone/backbone.js'], dest: 'public/js/lib'},
            { expand: true, flatten: true, src: ['bower_components/backbone-query-parameters/backbone.queryparams.js'], dest: 'public/js/lib'},        
            { expand: true, flatten: true, src: ['bower_components/handlebars/handlebars.min.js'], dest: 'public/js/lib'},
            { expand: true, flatten: true, src: ['bower_components/jquery/jquery.min.js'], dest: 'public/js/lib'},
            { expand: true, flatten: true, src: ['bower_components/underscore/underscore-min.js'], dest: 'public/js/lib'},
            { expand: true, flatten: true, src:['bower_components/jslider/bin/jquery.slider.min.js'], dest: 'public/js/lib'},

            { expand: true, flatten: true, src: ['bower_components/normalize-css/normalize.css'], dest: 'public/css'},
            { expand: true, flatten: true, src:['dev/data/*.*'], dest: 'public/data'},
            { expand: true, flatten: true, src:['dev/img/assets/**'], dest: 'public/img/assets/'},
            ]
          }
        },

    // process html to set to minified versions
    processhtml: {
      dist: {
        files: {
          'index.html': ['dev/index.html']
        }
      }
    },

    // combine all js files
    concat: {
        basic: {
          src: ['dev/js/*.js', 'dev/js/models/*.js', 'dev/js/collections/*.js', 'dev/js/views/*.js', 'dev/js/routers/*.js'],
          dest: 'public/js/app.js',
        },
        libs: {
          src: ['public/js/lib/underscore-min.js',
                'public/js/lib/handlebars.min.js',
                'public/js/lib/jquery.min.js',
                'public/js/lib/backbone.js',
                'public/js/lib/backbone.queryparams.js',
                'public/js/lib/jquery.slider.min.js'
          ],
          // src: ['public/js/lib/*.js'],
          dest: 'public/js/libs.js',
        },
      },

    // concat and minify css
    cssmin: {
      combine: {
        files: {
          'public/css/main.min.css': ['dev/css/*.css']
        }
      }
    },

    // minify the js
    uglify: {
      js: {
        files: {
          'public/js/app.min.js': ['public/js/app.js'] //save over the newly created script
        }
      }
    }

  });

  grunt.registerTask("jshint2", ["jshint"]);
  grunt.registerTask("copy2", ["copy"]);
  grunt.registerTask("dev", ['clean:build', 'copy', "concat:basic", "concat:libs", "uglify","cssmin", "processhtml", 'clean:between_build']);

};