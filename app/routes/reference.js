const router = require("express").Router();
const middleware = require("../middleware");
const controllers = require("../controllers/reference");

router.post("/addReference",
    middleware.isLoggedIn,
    controllers.addReference
)

router.get('/getAllReference/:candidateProfileId',
    middleware.isLoggedIn,
    controllers.getAllReference
)

router.get('/referenceById/:id',
    middleware.isLoggedIn,
    controllers.referenceById
)


router.put('/updateReference/:candidateProfileId',
    middleware.isLoggedIn,
    controllers.addReference
)

router.delete('/deleteReference/:id',
    middleware.isLoggedIn,
    controllers.deteleReference
)

module.exports = router