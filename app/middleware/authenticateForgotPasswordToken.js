const moment = require('moment');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

module.exports = async (req, res, next) => {
  try {
    const options = {};
    options.where = {
      token: req.params.passwordResetToken,
      expiredAt: { [Op.gte]: moment() },
      servedAt: null,
    };
    options.include = [
      {
        model: global.db.User,
        as: 'User',
        required: true,
      },
    ];

    req.restPassword = await global.db.ForgotPassword.findOne(options);

    if (!req.restPassword) {
      res.status(401).json({ message: 'Token has Expired or Invalid', status: 401 });
      return;
    }
    next();
  } catch (e) {
    global.cli.log('middleware:authenticateForgotPasswordToken', e);
    res.status(500).json({ message: e.message });
  }
};
