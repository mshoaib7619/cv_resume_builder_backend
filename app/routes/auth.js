const router = require('express').Router();

const middleware = require('../middleware');
const controllers = require('../controllers/auth');  

router.post('/login',
  middleware.authenticateLogin,
  middleware.loadUserContext,
  controllers.login,   
);

router.get('/logout',
  middleware.isLoggedIn,
  controllers.logout    
);

router.post('/signup',
  controllers.signup    
);

module.exports = {
  login,
  signup,
  logout,
  getProfile,
  updateProfile,
  isUsernameAvailable,
  authenticatePasswordToken
};

