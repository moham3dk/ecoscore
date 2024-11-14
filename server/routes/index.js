const router = require("express").Router();
const actionRoutes = require("./actionRoutes");
const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");

router.use("/actions", actionRoutes);
router.use("/users", userRoutes);
router.use("/articles", articleRoutes);

module.exports = router;
