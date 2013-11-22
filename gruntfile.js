module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-bower-install-task");

   grunt.registerTask("copy2", ["copy"]);

};