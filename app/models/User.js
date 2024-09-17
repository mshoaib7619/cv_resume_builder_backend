const moment = require('moment');
const _ = require('lodash');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const helpers = require('../helpers');
const { baseUrl } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  const modelAttributes = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required.',
        },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required.',
        },
      },
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'FirstName is required.',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    
    createdBy: { type: DataTypes.INTEGER, defaultValue: 0 },
    updatedBy: { type: DataTypes.INTEGER, defaultValue: 0 },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
  };

  const User = sequelize.define('User', modelAttributes, {
    tableName: 'Users',
    timestamps: true,
    paranoid: true,
  });

  User.attributes = modelAttributes;

  User.associate = (db) => {
    User.hasMany(db.LoginToken, { foreignKey: 'userId' });
  };

  User.save = async (params, userId, transaction = null) => {
    try {
      console.log('modelAttributes :>> ', modelAttributes);
      const data = helpers.seql.getRawParams(params, modelAttributes);
      data.updatedBy = userId;
      if (data.password && !_.isEmpty(data.password)) {
        data.password = await helpers.auth.encryptPassword(data.password);
      } else {
        delete data.password;
      }
      if (!data.id) {
        data.createdBy = userId;
        return global.db.User.create(data, { transaction });
      }
      delete data.username;
      await global.db.User.update(
        data,
        { where: { id: data.id } },
        { transaction },
      );
      return global.db.User.getOne(data);
    } catch (e) {
      global.cli.log('model:User:save: ', e);
      throw new Error(e);
    }
  };

  User.getLoggedInUserInfo = async (token) => {
    try {
      const options = {};
      options.attributes = ['id', 'username', 'firstName']
      options.include = [
        {
          model: global.db.LoginToken,
          where: {
            token,
            expiredAt: { [Op.gte]: moment().toDate() },
          },
          attributes: [],
        },
      ];
      const user = await global.db.User.findOne(options);
      return user;
    } catch (e) {
      global.cli.log('model:User:getLoggedInUserInfo: ', e,);
      throw new Error(e);
    }
  };
  User.getProfile = async (params) => {
    try {
      const options = {};
      options.where = { isActive: true, id: params.id };
      options.attributes = ['id', 'username', 'password', 'firstName', 'lastName', 'initials', 'email', 'phone', 'mobile',
        'address', 'cityId', 'originCountryId', 'residenceCountryId', 'residentNumber', 'profilePic', 'language']
      options.include = [
        {
          model: global.db.City,
          attributes: ['id', 'name', 'countryId'],
          include: [
            {
              model: global.db.Country,
              attributes: ['id', 'name']
            },
          ],
        },
      ];

      const userProfile = await global.db.User.findOne(options);
      if (userProfile) {
        userProfile.profilePic = {
          path: (userProfile.profilePic && `${baseUrl}/uploads/${userProfile.profilePic}`) || null,
          name: userProfile.profilePic || null,
        };
      }
      return userProfile;
    } catch (e) {
      global.cli.log('model:User:getProfile: ', e,);
      throw new Error(e);
    }
  };
  User.updateProfile = async (params, userId) => {
    try {
      let user = {};
      if (params.password) {
        const userProfile = await global.db.User.getProfile(params);
        const viewPass = await helpers.auth.decryptPassword(params.oldPassword, userProfile.password);
        if (viewPass) {
          user = await global.db.User.save(params, userId);
        }
      } else {
        user = await global.db.User.save(params, userId);
      }
      return user;
    } catch (e) {
      global.cli.log('model:User:updateProfile: ', e,);
      throw new Error(e);
    }
  };
  User.getByUsername = async (username) => {
    try {
      return global.db.User.getOne({ username });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return User;
};
