//-----основной модуль
import gulp from "gulp";



//-----импорт пользовательских модулей
import { path } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
import { copy } from "./gulp/tasks/copy.js";
import { html } from "./gulp/tasks/html.js";
import { images } from "./gulp/tasks/images.js";
import { js } from "./gulp/tasks/js.js";
import { reset } from "./gulp/tasks/reset.js";
import { scss } from "./gulp/tasks/scss.js";
import { server } from "./gulp/tasks/server.js";

// передаем значения в глобальную переменую
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
   
};

// наблюдатель за изменениями в файлах
function watcher()  {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.images, images);
  gulp.watch(path.watch.js, js);
}; 
const mainTasks = gulp.parallel(copy, html, scss, js, images)

// построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server, scss))

// выполнение сценариев по умолчанию
gulp.task('default', dev);

