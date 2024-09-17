const router = require('express').Router();
const middleware = require('../middleware');
const auth = require('./auth');
const api = require('./api');

const candidateProfile = require('./candidateProfile');
const qualifiction = require('./qualification');
const skill = require('./skill');
const project = require('./project');
const experience = require('./experience');
const objective = require('./objective');
const reference = require('./reference');
const language = require('./language')
const cvGenerate = require('./cvGenerate')

router.use('/', auth);

router.use('/api',
  middleware.isLoggedIn,
  middleware.loadUserContext,
  api
);

router.use('/candidateProfile',candidateProfile)
router.use('/qualifiction', qualifiction);
router.use('/skill', skill);
router.use('/project', project);
router.use('/experience', experience);
router.use('/objective', objective);
router.use('/reference', reference);
router.use('/language', language);
router.use('/cv', cvGenerate);




module.exports = router;
