const router = require("express").Router();
const { logout } = require("../controllers/logout");

router.get("/logout", logout);

module.exports = router;
