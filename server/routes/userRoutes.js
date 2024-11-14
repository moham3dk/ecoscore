const router = require("express").Router();
const userController = require("../controllers/userController");
const authHandler = require("../middleware/authHandler");
const validationHandler = require("../middleware/validationHandler");
const validateInput = require("../middleware/validateInput");

router.post(
  "/register",
  validateInput.user.register,
  validationHandler,
  userController.register
);
router.post(
  "/login",
  validateInput.user.login,
  validationHandler,
  userController.login
);
router.get("/profile", authHandler, userController.getUser);
router.get("/check", authHandler, userController.checkAuth);
router.get("/leaderboard", userController.getLeaderboard);

module.exports = router;
