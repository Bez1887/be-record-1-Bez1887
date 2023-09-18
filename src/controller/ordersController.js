/* 1 */

const Order = require("../models/Order");

/* Wir holen uns alle Order */

const getOrders = async (req, res, next) => {
  try {
    /* (populate) umsiedeln von Daten // Relations Aufgabe aus Slack */
    const orders = await Order.find().populate("records", "-_id");
    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "records",
      "-_id"
    );
    if (!order) throw new Error("this Order does not exist");
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};

const addOrder = async (req, res, next) => {
  try {
    const order = new Record(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) throw new Error("can not delete what is not there");
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  const orderId = req.params.id;
  const updatedOrder = req.body;
  try {
    const order = await Order.findByIdAndUpdate(orderId, updatedOrder, {
      new: true,
    });
    if (!Order) throw new Error("can not update");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrders,
  getOrder,
  addOrder,
  deleteOrder,
  updateOrder,
};
