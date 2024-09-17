const express = require("express");

const router = express.Router();
const controllers = require("../../controllers");

router.get('/user-context', (req, res) => {
  res.json(req.userContext);
});

router.get(
  '/username-available/:username',
  controllers.auth.isUsernameAvailable
);



module.exports = router;
