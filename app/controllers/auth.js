const uniqid = require('uniqid');
const moment = require('moment');
const modules = require('../modules');
const Sequelize = require('sequelize');
const { User } = require('../models');
const { Op } = Sequelize;

module.exports.login = async (req, res) => {
  try {
    res.json(req.userContext);
  } catch (e) {
    global.cli.log('controller:auth:login:', e);
    res.status(500).json({ message: e.message });
  }
};

module.exports.signup = async (req, res) => {
  try {
    const data = req.body;
    await global.db.User.save(data, 1);
    res.status(200).json({});
  } catch (e) {
    global.cli.log('controller:auth:signup:', e);
    res.status(500).json({ message: e.message });
    
  }
};

module.exports.logout = async (req, res) => {
  try {
    await global.db.LoginToken.expireToken(req.user.token);
    res.status(200).json({ message: 'Logged Out' });
  } catch (e) {
    global.cli.log('controller:auth:logout:', e);
    res.status(500).json({ message: 'Some error has occurred please try later.' });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const params = {};
    params.id = 1;
    const profile = await global.db.User.getProfile(params);
    res.status(200).json(profile);
  } catch (e) {
    global.cli.log('controller:auth:getProfile:', e);
    res.status(500).json({ message: e.message });
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const params = req.body;
    params.id = req.user.id;
    const user = await global.db.User.updateProfile(params, req.user.id);
    res.status(200).json({ user });
  } catch (e) {
    global.cli.log('controller:auth:updateProfile', e);
    res.status(500).json({ message: e.message });
  }
};

module.exports.isUsernameAvailable = async (req, res) => {
  try {
    const user = await global.db.User.getByUsername(req.params.username);
    if (!user) {
      res.status(200).json({ message: 'Username is available' });
      return;
    }
    res.status(404).json({ message: 'Username is not available' });
  } catch (e) {
    global.cli.log('controller:auth:isUsernameAvailable: ', e);
    res.status(500).json({ message: e.message });
  }
};


module.exports.authenticatePasswordToken = async (req, res) => {
  try {
    res.status(200).json(req.restPassword);
  } catch (e) {
    global.cli.log('controller:auth:authenticatePasswordToken: ', e);
    res.status(500).json({ message: e.message });
  }
};

