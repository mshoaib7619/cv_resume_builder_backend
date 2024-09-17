const _ = require('lodash');
const { baseUrl } = require('../config/config');

const getUserContext = async (user) => {
  try {
    let permissions = '';
    const cUser = await global.db.User.findOne({
      where: { id: user.id },
      attributes: ['id'],
    });
    const uC = {
      user,
      token: user.token,
      isSuperAdmin: true,
    }
    return uC;
  } catch (e) {
    global.cli.log('middleware:loadUserContext:getUserContext: ', e);
    throw new Error(e.message);
  }
};
const getUserPermissions = async (roleId) => {
  try {
    const permission = await global.db.RolePermission.findAll({
      attributes: ['id'],
      where: { roleId },
      include: {
        model: global.db.Permission,
        attributes: ['permission'],
      }
    })
    return permission;
  } catch (e) {
    global.cli.log('middleware:loadUserContext:getUserPermissions: ', e);
    throw new Error(e.message);
  }
};
module.exports = async (req, res, next) => {
  try {
    const uC = await getUserContext(req.user);
    uC.baseUrl = baseUrl;
    req.userContext = uC;
    next();
  } catch (e) {
    global.cli.log('middleware:loadUserContext:', e);
    res.status(500).json({ message: `middleware: error while loading UserContext: ${e.message}` });
  }
};
