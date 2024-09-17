const router = require('express').Router();
const middleware = require('../middleware');
const controllers = require('../controllers/cvGenerate');


router.get('/cvGenerate',
    controllers.cvGenerate
)


module.exports = router;