module.exports = function(grunt) {

  // makes  grunt.loadNpmTasks('...') not needed
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

     dirs: {
        src: 'public/js'
    },

    jshint: {
      files: ['Gruntfile.js', 'public/js/*'],
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

     concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          '<%= dirs.src %>/main.js',
          '<%= dirs.src %>/handlehelpers.js', 
          '<%= dirs.src %>/collections/graphics.js'
        ],
        dest: 'dist/built.js',
      },
    },

    copy: {
      main: {
        files: [
          // includes files within path
          { expand: true, flatten: true, src: ['bower_components/backbone/backbone-min.js'], dest: 'public/js/lib'},
          { expand: true, flatten: true, src: ['bower_components/backbone/backbone-min.map'], dest: 'public/js/lib'},         
          { expand: true, flatten: true, src: ['bower_components/backbone-query-parameters/backbone.queryparams.js'], dest: 'public/js/lib'},        
          { expand: true, flatten: true, src: ['bower_components/handlebars/handlebars.min.js'], dest: 'public/js/lib'},
          { expand: true, flatten: true, src: ['bower_components/jquery/jquery.min.js'], dest: 'public/js/lib'},
          { expand: true, flatten: true, src: ['bower_components/jquery/jquery.min.map'], dest: 'public/js/lib'},
          { expand: true, flatten: true, src: ['bower_components/underscore/underscore-min.js'], dest: 'public/js/lib'},
          { expand: true, flatten: true, src: ['bower_components/underscore/underscore-min.map'], dest: 'public/js/lib'},
          { expand: true, flatten: true, src: ['bower_components/normalize-css/normalize.css'], dest: 'public/css'},
        ]
      }
    },

   processhtml: {
        options: {
          data: {
            message: 'Hello world!'
          }
        },
        dist: {
          files: {
            'dest/index.html': ['index.html']
         }
      }
   },

    uglify: {
      my_target: {
        files: {
          'dest/output.min.js': ['src/input1.js', 'src/input2.js']
        }
      }
    }

  });

 
   grunt.registerTask("copy2", ["copy"]);
   grunt.registerTask("concat2", ["concat"]);
   grunt.registerTask("processhtml2", ["processhtml"]);

};