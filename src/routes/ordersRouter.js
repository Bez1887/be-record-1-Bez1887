/* 2 */

const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrder,
  deleteOrder,
  addOrder,
  updateOrder,
} = require("../controller/ordersController");

router.route("/").get(getOrders).post(addOrder);

router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
