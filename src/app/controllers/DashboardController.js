const { User, Appointment } = require("../models");
const moment = require("moment");
const { Op } = require("sequelize");
class DashboardController {
  async index(req, res) {
    if (!req.session.user.provider) {
      const providers = await User.findAll({ where: { provider: true } });
      return res.render("dashboard", { providers });
    } else {
      const date = moment(new Date());
      const appointments = await Appointment.findAll({
        include: [{ model: User, as: "user" }],
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.between]: [
              date.startOf("day").format(),
              date.endOf("day").format()
            ]
          }
        }
      });

      return res.render("dashboard", { appointments });
    }
  }
}

module.exports = new DashboardController();
