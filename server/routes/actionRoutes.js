const router = require("express").Router();
const actionController = require("../controllers/actionController");
const authHandler = require("../middleware/authHandler");
const validationHandler = require("../middleware/validationHandler");
const validateInput = require("../middleware/validateInput");

router.post(
  "/complete",
  authHandler,
  validateInput.action.complete,
  validationHandler,
  actionController.completeAction
);
router.get("/", actionController.getActions);

module.exports = router;
