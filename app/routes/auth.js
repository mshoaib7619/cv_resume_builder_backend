const router = require('express').Router();

const middleware = require('../middleware');
const controllers = require('../controllers/auth');  // This is importing the 'auth.js' file directly

router.post('/login',
  middleware.authenticateLogin,
  middleware.loadUserContext,
  controllers.login,   // Since you're importing the 'auth' directly, use 'controllers.login' here
);

router.get('/logout',
  middleware.isLoggedIn,
  controllers.logout    // Same here, use 'controllers.logout'
);

router.post('/signup',
  controllers.signup    // And here
);

module.exports = router;
