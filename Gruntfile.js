module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		, sass_directory_import: {
			base: {
				options: {
					quiet: true
				}
				, files: {
					src: ['src/sass/base/**/_all_base_import.scss']
				}
			}
			, layout: {
				options: {
					quiet: true
				}
				, files: {
					src: ['src/sass/layout/**/_all_layout_import.scss']
				}
			}
			, modules: {
				options: {
					quiet: true
				}
				, files: {
					src: ['src/sass/modules/**/_all_modules_import.scss']
				}
			}
		}
		, sass: {
			dist: {
				options: {
					style: 'compressed'
				}
				, files: [{
					expand: true,
					cwd: 'src/sass/',
					src: ['*.scss'],
					dest: 'css/',
					ext: '.css'
				}]
			}
		}
		, sprite:{
			all: {
				src: 'src/sprite/*.png',
				dest: 'images/sprite.png',
				destCss: 'src/sass/_sprite.scss'
			}
	    }
	    , imagemin: {
	        dynamic: {
	            files: [{
	                expand: true,
	                cwd: 'src/images/',
	                src: ['**/*.{png,jpg,gif}'],
	                dest: 'images/'
	            }]
	        }
	    }
		, uglify: {
			js: {
				files: {
					'js/main.min.js': ['src/js/*.js']
				}
			}
		}
		, autoprefixer: {
			options: {
				browsers: ['ie 8', 'ie 9' , 'last 2 Chrome versions', 'last 2 Firefox versions']
			}
			, target: {
				src: ['css/main.css'],
			    dest: 'css/styles.css'
			}
		}
		, watch: {
			sass_directory_import: {
				files: ['src/sass/base/*.scss', 'src/sass/layout/*.scss', 'src/sass/modules/*.scss'],
				tasks: ['sass_directory_import']
			}
			, css: {
				files: 'src/sass/*.scss',
				tasks: ['sass']
			}
			, jsmin: {
				files: 'src/js/*.js',
				tasks: ['newer:uglify']
			}
			, sprite: {
				files: 'src/sprite/*.png',
				tasks: ['sprite']
			}
			, imagemin: {
				files: 'src/images/**/*.{png,jpg,gif}',
				tasks: ['newer:imagemin']
			}
		}
		
	});

	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-sass-directory-import');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
		
	grunt.registerTask('default',[
		'sass_directory_import'
		, 'sass'
		, 'autoprefixer'
		, 'newer:uglify'
		, 'sprite'
		, 'newer:imagemin'
		, 'watch'
	]);
}