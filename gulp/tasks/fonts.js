import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf2 = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "Something wrong whith fonts",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "Something wrong whith fonts",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      fonter({
        formats: ["woff"],
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWieght = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            if (fontWieght.toLowerCase() === "thin") {
              fontWieght = 100;
            } else if (fontWieght.toLowerCase() === "extralight") {
              fontWieght = 200;
            } else if (fontWieght.toLowerCase() === "light") {
              fontWieght = 300;
            } else if (fontWieght.toLowerCase() === "medium") {
              fontWieght = 500;
            } else if (fontWieght.toLowerCase() === "semibold") {
              fontWieght = 600;
            } else if (fontWieght.toLowerCase() === "bold") {
              fontWieght = 700;
            } else if (
              fontWieght.toLowerCase() === "extraboldt" ||
              fontWieght.toLowerCase() === "heavy"
            ) {
              fontWieght = 800;
            } else if (fontWieght.toLowerCase() === "black") {
              fontWieght = 900;
            } else {
              fontWieght = 700;
            }
            fs.appendFile(
              fontsFile,
              `@font-face{
                                font-family: ${fontName};
                                font-display: swap;
                                src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                                font-weight: ${fontWieght};
                                font-style: normal;
                            }\r\n`,
              cb
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          "Файл scss/fonts.scss  уже существуетю. Для обновления файла нужно его обновить"
        );
      }
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
};
