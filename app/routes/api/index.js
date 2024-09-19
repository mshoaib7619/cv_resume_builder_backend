const express = require("express");

const router = express.Router();
const controllers = require("../../controllers/auth");

router.get('/user-context', (req, res) => {
  res.json(req.userContext);
});

router.get(
  '/username-available/:username',
  controllers.isUsernameAvailable
);



module.exports = router;
