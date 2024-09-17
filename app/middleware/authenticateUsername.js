module.exports = async (req, res, next) => {
  try {
    req.user = await global.db.User.getOne({
      username: req.body.username,
      isActive: true,
    });
    if (!req.user) {
      res.status(401).json({ message: 'Invalid username.' });
      return;
    }
    next();
  } catch (e) {
    global.cli.log('middleware:authenticateUsername', e);
    res.status(500).json({ message: e.message });
  }
};
