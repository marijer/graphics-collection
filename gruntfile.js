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

  // process html to set to minified versions
   processhtml: {
        dist: {
          files: {
            'index.html': ['build/index.html']
         }
      }
   },

   // concatenates js files
        concat: {
            options: {
                separator: ';' //separates scripts
            },
            dist: {
                src: ['build/js/*.js', 'build/js/models/*.js', 'build/js/collections/*.js', 'build/js/views/*.js', 'build/js/routers/*.js'], //Using mini match for scripts to concatenate
                dest: 'public/js/app.js' //where to output the script
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

 
   grunt.registerTask("copy2", ["copy"]);
   grunt.registerTask("build", ["concat", "uglify", "processhtml"]);

};