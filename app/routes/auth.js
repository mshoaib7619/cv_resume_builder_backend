const router = require('express').Router();

const middleware = require('../middleware');
const controllers = require('../controllers');
const constants = require('../constants');

router.post('/login',
  middleware.authenticateLogin,
  middleware.loadUserContext,
  controllers.auth.login,
);

router.get('/logout',
  middleware.isLoggedIn,
  controllers.auth.logout
);

router.post('/signup',
  controllers.auth.signup
);



module.exports = router;
