const router = require('express').Router();
const middleware = require('../middleware');
const controllers = require('../controllers/objective');

router.post('/addObjective',
    middleware.isLoggedIn,
    controllers.addObjective
)


router.get('/getObjective/:candidateProfileId',
    middleware.isLoggedIn,
    controllers.getObjective
)

router.put('/updateObjective/:candidateProfileId',
    middleware.isLoggedIn,
    controllers.addObjective
)

router.delete('/deleteObjective/:id',
    middleware.isLoggedIn,
    controllers.deleteObjective
)


module.exports = router;