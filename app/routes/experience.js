const router = require('express').Router()
const middleware = require("../middleware")
const controllers = require("../controllers/experience")

router.post('/addExperience',
    middleware.isLoggedIn,
    controllers.addExperience,
 );


router.get('/allExperience/:candidateProfileId',
    middleware.isLoggedIn,
    controllers.allExperience
);

router.get('/experienceById/:id',
    middleware.isLoggedIn,
    controllers.experienceById
);

router.put('/updateExperience/:candidateProfileId',
    middleware.isLoggedIn,
    controllers.addExperience
)

router.delete('/deleteExperience/:id',
    middleware.isLoggedIn,
    controllers.deleteExperience
)



 module.exports = router