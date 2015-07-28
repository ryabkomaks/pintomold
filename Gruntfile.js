module.exports = function(grunt) {
	var random = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;

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
				, files: {                         
					'css/main.css': 'src/sass/main.scss'
				}
			}
		}
		, sprite:{
			all: {
				src: 'src/sprite/*.png',
				dest: 'img/sprite.png',
				destCss: 'src/sass/_sprite.scss',
				imgPath: 'img/sprite.png?random=' + random,
				algorithm: 'binary-tree'
			}
	    }
	    , imagemin: {
	        dynamic: {
	            files: [{
	                expand: true,
	                cwd: 'src/images/',
	                src: ['**/*.{png,jpg,gif}'],
	                dest: 'img/'
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
			sass_directory_base_import: {
				files: ['src/sass/base/*.scss', '!src/sass/base/_all_base_import.scss'],
				tasks: ['sass_directory_import:base', 'sass']
			}
			, sass_directory_layout_import: {
				files: ['src/sass/layout/*.scss', '!src/sass/layout/_all_layout_import.scss'],
				tasks: ['sass_directory_import:layout']
			}
			, sass_directory_modules_import: {
				files: ['src/sass/modules/*.scss', '!src/sass/modules/_all_modules_import.scss'],
				tasks: ['sass_directory_import:modules']
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