//-----основной модуль
import gulp from "gulp";
import ttf2woff2 from "gulp-ttf2woff2";

//-----импорт пользовательских модулей
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import { copy } from "./gulp/tasks/copy.js";
import { fontsStyle, otfToTtf2, ttfToWoff } from "./gulp/tasks/fonts.js";
import { html } from "./gulp/tasks/html.js";
import { images } from "./gulp/tasks/images.js";
import { js } from "./gulp/tasks/js.js";
import { reset } from "./gulp/tasks/reset.js";
import { scss } from "./gulp/tasks/scss.js";
import { server } from "./gulp/tasks/server.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";

// передаем значения в глобальную переменую
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.js, js);
}

export { svgSprive };
const fonts = gulp.series(otfToTtf2, ttfToWoff, fontsStyle);

const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

// построение сценариев выполнения задач
export const dev = gulp.series(
  reset,
  mainTasks,
  gulp.parallel(watcher, server, scss)
);
export const build = gulp.series(reset, mainTasks);
export const deployZIP = gulp.series(reset, mainTasks, zip);
export const deployFTP = gulp.series(reset, mainTasks, ftp);

// выполнение сценариев по умолчанию
gulp.task("default", dev);
