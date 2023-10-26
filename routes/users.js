const router = require("express").Router();

const { updateUserById, getCurrentUser } = require("../controllers/users");
const { updateUserValidator } = require("../validation/validationRules");

router.get("/me", getCurrentUser);

router.patch("/me", updateUserValidator, updateUserById);

module.exports = router;
