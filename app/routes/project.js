const router = require('express').Router();
const middleware = require('../middleware');
const controllers = require('../controllers/project');

router.post('/addProject',
  middleware.isLoggedIn,
  controllers.addProject,
);

router.get('/allProject/:candidateProfileId',
  middleware.isLoggedIn,
  controllers.allProject,
);

router.get('/projectById/:id',
  middleware.isLoggedIn,
  controllers.projectById,
);

router.put('/updateProject/:candidateProfileId',
  middleware.isLoggedIn,
  controllers.addProject,
);

router.delete('/deleteProject/:id',
  middleware.isLoggedIn,
  controllers.deleteProject,
);

module.exports = router;
