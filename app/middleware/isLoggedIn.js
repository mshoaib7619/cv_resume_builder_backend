/* eslint-disable prefer-destructuring */
module.exports = async (req, res, next) => {
  try {
    let token = '';
    let authorization = '';
    if (req.query.token) {
      authorization = req.query.token.split(' ')[0];
      token = req.query.token.split(' ')[1];
    } else {
      authorization = req.headers.authorization.split(' ')[0];
      token = req.headers.authorization.split(' ')[1];
    }
    if (authorization !== 'Bearer') {
      res.status(403).json({ auth: false, message: 'Token is not provided.' });
      return;
    }
    const user = await global.db.User.getLoggedInUserInfo(token);
    if (!user) {
      global.cli.error('middleware: isLoggedIn: You are not authorized to perform this action.');
      res.status(403).json({ message: 'You are not authorized to perform this action.' });
      return;
    }

    req.user = user;
    req.user.token = token;
    next();
  } catch (error) {
    global.cli.log('middleware:isLoggedIn', error);
    res.status(500).json({ message: 'Please sign in.' });
  }
};
