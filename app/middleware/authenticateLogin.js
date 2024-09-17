const helpers = require('../helpers');

module.exports = (async (req, res, next) => {
  try {
    let user = await global.db.User.getOne({
      username: req.body.username,
      isActive: true,
    });
    if (!user) {
      res.status(401).json({ message: 'Invalid username or password.' }); return;
    }
    const passwordIsValid = await helpers.auth.decryptPassword(req.body.password, user.password);
    if (!passwordIsValid) {
      res.status(401).json({ auth: false, token: null, message: 'Invalid username or password.' });
      return;
    }
    const ip = helpers.http.getIp(req);
    const userAgent = req.headers['user-agent'];
    const token = await global.db.LoginToken.generateToken(user.id, ip, userAgent, req.body.rememberMe);
    user = await global.db.User.getLoggedInUserInfo(token);
    delete user.password;
    req.user = user;
    req.user.token = token;
    next();
  } catch (e) {
    global.cli.log('middleware:authenticateLogin', e);
    res.status(500).json({ message: e.message });
  }
});
