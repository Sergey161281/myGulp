import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve())
const buildFolder = './dist';
const srcFolder = './src';

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/files/`,
        images: `${buildFolder}/img/`,
    },
    src: {
        images: `${srcFolder}/img/**/*.{jpg, jpeg, webp, png, gif }`,
        svg: `${srcFolder}/img/**/*.svg`,
        js: `${srcFolder}/js/app.js`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        scss: `${srcFolder}/scss/*.scss`,
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        images: `${srcFolder}/img/**/*.{jpg, jpeg, webp, png, gif, svg, ico }`,
        js: `${srcFolder}/js/**/*.js`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp:``
}

