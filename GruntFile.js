/*
 * Copyright (c) 2013, 2014, B3log
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Grunt 构建配置。
 * @author Liang Ding <DL88250@gmail.com>
 * @version 1.0.0.2, Mar 5, 2014
 */

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
            ' * Copyright (c) 2013, 2014, B3log\n' +
            ' *\n' +
            ' * Licensed under the Apache License, Version 2.0 (the "License");\n' +
            ' * you may not use this file except in compliance with the License.\n' +
            ' * You may obtain a copy of the License at\n' +
            ' *\n' +
            ' *    http://www.apache.org/licenses/LICENSE-2.0\n' +
            ' *\n' +
            ' * Unless required by applicable law or agreed to in writing, software\n' +
            ' * distributed under the License is distributed on an "AS IS" BASIS,\n' +
            ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
            ' * See the License for the specific language governing permissions and\n' +
            ' * limitations under the License.\n' +
            ' */\n',
        stamp: {
            options: {
                banner: '<%= banner %>'
            },
            target: {
                files: [
                    {
                        src: 'src/main/js/**/*.js'
                    },
                    {
                        src: 'src/test/js/**/*.js'
                    },
                    {
                        src: 'src/main/public/stylesheets/**/*.css'
                    },
                    {
                        expand: true,
                        cwd: 'src/main/public/javascripts',
                        src: ['**/*.js', '!lib/**/*.js']
                    }
                ]
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['src/test/js/**/*.js']
            }
        },
        jsdoc: {
            dist: {
                src: ['src/main/js'],
                options: {
                    destination: 'doc'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>, <%= grunt.template.today("mmm dd, yyyy") %> */\n'
            },
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/main/public/static/javascripts',
                        src: '**/*.js',
                        dest: 'target/public/static/javascripts'
                    },
                    {
                        expand: true,
                        cwd: 'src/main/js',
                        src: '**/*.js',
                        dest: 'target/js'
                    }
                ]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'src/main/public/static/stylesheets',
                src: ['*.css', '!*.min.css'],
                dest: 'target/public/static/stylesheets'
            }
        },
        jshint: {
            files: ['src/main/js/**/*.js'],
            options: {
                globalstrict: true,
                globals: {
                    require: false,
                    console: false,
                    exports: false,
                    __dirname: false,
                    process: false,
                    module: false
                }
            }
        },
        clean: ["target/**", "doc/**"],
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/main/public/static/images',
                        src: ['**'],
                        dest: 'target/public/static/images'
                    },
                    {
                        expand: true,
                        cwd: 'src/main/resources',
                        src: ['**'],
                        dest: 'target/resources'
                    },
                    {
                        expand: true,

                        src: ['package.json'],
                        dest: 'target'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('dev', [ 'mochaTest', 'jshint']);

    grunt.loadTasks('tasks');
    grunt.registerTask('default', ['clean', 'stamp', 'mochaTest', 'jsdoc', 'uglify', 'jshint', 'cssmin',
        'copy']);
};
