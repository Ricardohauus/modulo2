const { Appointment } = require("../models");

class ScheduledController {
  async create(req, res) {
    const data = new Date();
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: data
      }
    });

    return res.render("scheduled/list", { appointments });
  }
}

module.exports = new ScheduledController();
