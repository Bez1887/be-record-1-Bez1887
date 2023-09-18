require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../models/User");
const Record = require("../models/Record");
const Order = require("../models/Order");

const db = mongoose
  .connect("mongodb://localhost:27017/recordshop")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error connecting to db"));

const purgeDate = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Record.deleteMany();
    console.log("deleted DB");
  } catch (err) {
    console.log(err);
  }
  mongoose.connection.close();
};

purgeDate();
