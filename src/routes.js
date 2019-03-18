const express = require("express");
const multerConfig = require("./config/multer");
const upload = require("multer")(multerConfig);
const routes = express.Router();

const authMiddleware = require("./app/middlewares/auth");
const guestMiddleware = require("./app/middlewares/guest");

const UserController = require("./app/controllers/userController");
const SessionController = require("./app/controllers/SessionController");

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/singin", SessionController.store);

routes.get("/singup", guestMiddleware, UserController.create);
routes.post("/singup", upload.single("avatar"), UserController.store);

routes.use("/app", authMiddleware);

routes.get("/app/dashboard", (req, res) => {
  console.log(req.session.user);
  return res.render("dashboard");
});

module.exports = routes;
