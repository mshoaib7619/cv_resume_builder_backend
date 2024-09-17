const router = require('express').Router();
const middleware = require('../middleware');
const controllers = require('../controllers/qualification');

router.post('/addQualification',
  middleware.isLoggedIn,
  controllers.addQualification,
);

router.get('/allQualification/:candidateProfileId',
  middleware.isLoggedIn,
  controllers.allQualification,
);

router.get('/qualificationById/:id',
  middleware.isLoggedIn,
  controllers.qualificationById,
);

router.put('/updateQualification/:candidateProfileId',
  middleware.isLoggedIn,
  controllers.addQualification,
);

router.delete('/deleteQualification/:id',
  middleware.isLoggedIn,
  controllers.deleteQualification,
);

module.exports = router;
