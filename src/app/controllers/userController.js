const { User } = require("../models");

class UserController {
  create(req, res) {
    return res.render("auth/singup");
  }
  //DADAS
  async store(req, res) {
    req.body.avatar = "teste.jpg";
    //const { filename: avatar } = req.file;
    //await User.create({ ...req.body, avatar });
    await User.create(req.body);
    return res.redirect("/");
  }
}

module.exports = new UserController();
