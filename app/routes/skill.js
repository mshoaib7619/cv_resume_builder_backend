const router = require('express').Router();
const middleware = require('../middleware');
const controllers = require('../controllers/skill');

router.post('/addSkill',
  middleware.isLoggedIn,
  controllers.addSkill,
);

router.get('/allSkill/:candidateProfileId',
  middleware.isLoggedIn,
  controllers.allSkill,
);

router.put('/updateSkill/:candidateProfileId',
  middleware.isLoggedIn,
  controllers.addSkill,
);

router.delete('/deleteSkill/:id',
  middleware.isLoggedIn,
  controllers.deleteSkill,
);

module.exports = router;
