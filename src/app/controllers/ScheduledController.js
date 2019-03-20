const { Appointment } = require("../models");

class ScheduledController {
  async index(req, res) {
    const data = new Date();
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.session.user.id,
        date: data
      }
    });
    return res.render("dashboard", { appointments });
  }
}

module.exports = new ScheduledController();
