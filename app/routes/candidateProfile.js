const router = require('express').Router();
const middleware = require('../middleware');
const controllers = require('../controllers/candidateProfile');

router.post('/addCandidateProfile',
  middleware.isLoggedIn,
  controllers.addCandidateProfile,
);

router.get('/allCandidateProfile',
  middleware.isLoggedIn,
  controllers.allCandidateProfile,
);

router.get('/candidateProfileById/:id',
  middleware.isLoggedIn,
  controllers.candidateProfileById,
);

router.put('/updateCandidateProfile',
  middleware.isLoggedIn,
  controllers.addCandidateProfile,
);

router.delete('/deleteCandidateProfile/:id',
  middleware.isLoggedIn,
  controllers.deleteCandidateProfile,
);

module.exports = router;
