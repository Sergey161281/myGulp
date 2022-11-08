import FtpConnection from "vinyl-ftp";
import util from "gulp-util";
import { configFTP } from "../config/ftp";

export const ftp = () => {
  configFTP.log = util.log;
  const ftpConnect = FtpConnection.create(configFTP);
  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "FTP is wrong",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(ftpConnect.dest(`./${app.path.ftp}/${app.path.rootFolder}`));
};
