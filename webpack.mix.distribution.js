/**
 * Laravel mix - JustLight theme
 *
 * Output:
 * 		- dist
 *      - jc-theme-justlight
 *        - resources
 *          - css (minified)
 *          - fonts
 *          - views
 *        module.php
 *        LICENSE.md
 *        README.md
 *      - justlight-x.zip
 *
 */

let mix = require('laravel-mix');
let config = require('./webpack.mix.config');
require('laravel-mix-clean');

const version  = '2.0.10';
const dist_dir = 'dist/jc-theme-justlight';

//https://github.com/gregnb/filemanager-webpack-plugin
const FileManagerPlugin = require('filemanager-webpack-plugin');

mix
    .setPublicPath('./dist')
    .copyDirectory(config.public_dir + '/fonts', dist_dir + '/resources/fonts')
    .copyDirectory(config.public_dir + '/views', dist_dir + '/resources/views')
    .copy(config.build_dir + '/justlight.min.css', dist_dir + '/resources/css/justlight.min.css')
    .copy('module.php', dist_dir)
    .copy('LICENSE.md', dist_dir)
    .copy('README.md', dist_dir)
    .webpackConfig({
        plugins: [
          new FileManagerPlugin({
            onEnd: {
                archive: [
                    { source: './dist', destination: 'dist/justlight-' + version + '.zip'}
                  ]
            }
          })
        ]
    })
    .clean();
