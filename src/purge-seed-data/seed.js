require("dotenv").config();
const mongoose = require("mongoose");
const Chance = require("chance"); /* sind fake daten hinterlegt */
const User = require("../models/User.js");
const Record = require("../models/Record.js");
const Order = require("../models/Order.js");
const chance = new Chance();
///////////////////////////////////////
const db = mongoose
  .connect("mongodb://localhost:27017/recordshop")
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error connecting to db"));
/////////////////////////
const createData = async () => {
  try {
    const users = [];
    const orders = [];
    const records = [];
    //users FAKE USERS
    for (let i = 0; i < 20; i++) {
      const user = {
        firstname: chance.first(),
        lastname: chance.last(),
        email: chance.email({ domain: "example.com" }),
        password: chance.hash({ length: 9 }),
        address: {
          street: chance.street(),
          zipCode: chance.zip(),
        },
      };
      users.push(user);
    }
    await User.insertMany(users);
    //orders
    for (let i = 0; i < 20; i++) {
      const order = new Order({
        quantity: chance.integer({ min: 1, max: 20 }),
      });
      orders.push(order);
    }
    await Order.insertMany(orders);
    //records
    for (let i = 0; i < 20; i++) {
      const record = new Record({
        title: chance.string({ length: 5 }),
        artist: chance.name({ middle: true }),
        year: chance.year({ min: 1950, max: 2023 }),
        price: chance.integer({ min: 5, max: 40 }),
      });
      records.push(record);
    }
    await Record.insertMany(records);
  } catch (err) {
    console.log(err);
  }
  mongoose.connection.close();
};

//////////////////////
createData();
