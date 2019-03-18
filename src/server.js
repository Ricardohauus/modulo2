const express = require("express");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const nunjucks = require("nunjucks");
const path = require("path");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV != "production";

    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(
      session({
        name: "root",
        secret: "MyAppSecret",
        resave: false,
        store: new fileStore({
          path: path.resolve(__dirname, "..", "tmp", "sessions")
        }),
        saveUninitialized: false
      })
    );
  }

  views() {
    nunjucks.configure(path.resolve(__dirname, "app", "views"), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    });

    this.express.use(express.static(path.resolve(__dirname, "public")));

    this.express.set("view engine", "njk");
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;
