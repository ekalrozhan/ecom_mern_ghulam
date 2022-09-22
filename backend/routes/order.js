const express = require("express");
const route = express.Router();

const { newOrder, getSingleOrder, myOrders } = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").post(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").post(isAuthenticatedUser, myOrders);

module.exports = router;
