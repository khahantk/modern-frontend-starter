'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        includereplace: 'grunt-include-replace'
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var modRewrite = require('connect-modrewrite');
    var serveStatic = require('serve-static');

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        assets: 'app/assets',
        bower: 'bower_components'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            includereplace: {
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/partials/{,*/}*.html',
                    '<%= config.app %>/templates/{,*/}*.html',
                    '<%= config.assets %>/data/{,*/}*.json',
                ],
                tasks: ['includereplace:server']
            },
            js: {
                files: ['<%= config.app %>/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            compass: {
                files: ['<%= config.app %>/**/*.{scss,sass}', '<%= config.app %>/**/**/*.{scss,sass}'],
                tasks: ['compass:server', 'postcss:server']
            },
            styles: {
                files: ['<%= config.app %>/**/*.css'],
                tasks: ['newer:copy:server', 'postcss:server']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>',
                    keepalive: true
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/partials/{,*/}*.html',
                    '<%= config.app %>/templates/{,*/}*.html',
                    '.tmp/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= config.assets %>/images/{,*/}*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9999,
                open: true,
                livereload: 32759,
                hostname: 'localhost' // Change this to '0.0.0.0' to access the server from outside
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            serveStatic('.tmp'),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic(config.assets),
                            serveStatic(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['dist']
                }]
            },
            server: {
                files: [{
                    dot: true,
                    src: ['.tmp', '.sass-cache']
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },
            all: [
                'Gruntfile.js',
                '<%= config.assets %>/scripts/{,*/}*.js',
                '<%= config.app %>/partials/{,*/}*.js',
                '<%= config.app %>/templates/{,*/}*.js',
                '!<%= config.assets %>/scripts/vendor/*',
            ]
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                cssDir: '.tmp/styles',
                sassDir: '<%= config.app %>/assets/styles',
                imagesDir: '<%= config.app %>/assets/images',
                fontsDir: '<%= config.app %>/assets/fonts',
                generatedImagesDir: '<%= config.app %>/assets/images/generated',
                generatedImagesPath: '<%= config.app %>/assets/images/generated',
                javascriptsDir: '<%= config.app %>/assets/scripts',
                httpGeneratedImagesPath: '../images/generated',
                httpImagesPath: '../images',
                httpFontsPath: '../fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                noLineComments: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= config.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: false
                }
            }
        },
        // Add vendor prefixed styles
        postcss: {
            options: {
                browsers: ['last 3 version'],
                processors: [
                    require('autoprefixer')({ browsers: ['last 3 versions'] })
                ]
            },

            server: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%=config.dist %>/styles/',
                    src: '{,*/}*.css',
                    dest: '<%=config.dist %>/styles/'
                }]
            }
        },


        includereplace: {
            server: {
                options: {
                },
                files: [
                    { src: '*.html', dest: '.tmp/', expand: true, cwd: '<%= config.app %>/' },
                ]
            },
            dist: {
                options: {
                },
                files: [
                    { src: '*.html', dest: '<%= config.dist %>/', expand: true, cwd: '<%= config.app %>/' },
                ]
            }
        },
        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: [
                    '<%= config.app %>/partials/head.html',
                    '<%= config.app %>/partials/script.html'
                ],
                exclude: ['bower_components/bootstrap-sass/assets/javascripts/bootstrap.js']
            },
            sass: {
                src: ['<%= config.app %>/assets/styles/{,*/}*.{scss,sass}']
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            files: {
                src: [
                    '<%= config.dist %>/scripts/{,*/}*.js',
                    '<%= config.dist %>/styles/{,*/}*.css',
                    '<%= config.dist %>/images/{,*/}*.*',
                    '<%= config.dist %>/styles/fonts/{,*/}*.*',
                    '<%= config.dist %>/*.{ico,png}'
                ]
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: [
                '<%= config.app %>/partials/head.html',
                '<%= config.app %>/partials/script.html'
            ]
        },
        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },
        // concat:{
        //     options: {
        //     }
        // },
        // uglify: {
        //     options: {
        //         preserveComments: false,
        //         compress: {
        //             drop_console: true
        //         }
        //     }
        // },
        // cssmin:{
        //     dist: {

        //     }
        // },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.assets %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.assets %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                },
                    {
                        expand: true,
                        cwd: '<%= config.assets %>/fonts',
                        src: '{,*/}*.svg',
                        dest: '<%= config.dist %>/fonts'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            common: {
                files:
                [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt, md}'
                    ]
                },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.assets %>/data/',
                        dest: '<%= config.dist %>/data/',
                        src: '**'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.assets %>/scripts/libs/',
                        dest: '<%= config.dist %>/scripts/libs/',
                        src: '**'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.assets %>/images/',
                        dest: '<%= config.dist %>/images/',
                        src: '**'
                    }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>/angularjs/',
                    dest: '<%= config.dist %>/angularjs/',
                    src: '**/*.tpl'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '.tmp/',
                    src: [
                        'assets/styles/{,*/}*.css',
                        'assets/fonts/{,*/}*.*'
                    ]
                },
                    {
                        expand: true,
                        dot: true,
                        cwd: '.',
                        src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
                        dest: '<%= config.dist %>'
                    }]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'includereplace:server',
                'compass:server',
                'copy:server'
            ],
            test: [
            ],
            dist: [
                'compass',
                'copy:common',
                'copy:dist',
                'imagemin',
                'svgmin'
            ]
        }
    });


    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        if (target === 'preview') {
            return grunt.task.run(['connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'postcss:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'bowerInstall',
        'concurrent:dist',
        'includereplace:dist',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'postcss:dist'
    ]);

    grunt.registerTask('clear', [
        'clean:server',
        'clean:dist'
    ]);

    grunt.registerTask('default', [
        'serve'
    ]);
};