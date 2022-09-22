const express = require("express");
const route = express.Router();

const { newOrder } = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;
