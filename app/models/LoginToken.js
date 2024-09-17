const uniqid = require('uniqid');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const LoginToken = sequelize.define('LoginToken', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'fkUserId',
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    expiredAt: { type: DataTypes.DATE },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  }, {
    tableName: 'LoginTokens',
    timestamps: true,
  });

  LoginToken.generateToken = async (userId, ip, userAgent, rememberMe) => {
    const token = uniqid();
    const expiresAt = rememberMe && moment().add(1, 'months').toDate() || moment().add(8, 'hours').toDate();
    return global.db.LoginToken.create({
      userId,
      token,
      expiredAt: expiresAt,
      ip,
      userAgent,
    }).then(res => res.token);
  };

  LoginToken.expireToken = async (token) => {
    const loginToken = await global.db.LoginToken.findOne({
      where: { token },
    });
    loginToken.expiredAt = moment().toDate();
    await loginToken.save();
  };
  return LoginToken;
};

