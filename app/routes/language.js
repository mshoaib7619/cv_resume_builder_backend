const router = require('express').Router();
const middleware = require("../middleware");
const controllers = require("../controllers/language");

router.post("/addLanguage",
    middleware.isLoggedIn,
    controllers.addLanguage
)

router.get('/allLanguage/:candidateProfileId',
    middleware.isLoggedIn,
    controllers.allLanguage
)

router.get('/languageById/:id',
    middleware.isLoggedIn,
    controllers.languageById
)

router.put('/updateLanguage/:candidateProfileId',
    middleware.isLoggedIn,
    controllers.addLanguage
)

router.delete('/deleteLanguage/:id',
    middleware.isLoggedIn,
    controllers.deleteLanguage
)


module.exports = router