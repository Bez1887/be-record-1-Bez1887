const mongoose = require("mongoose");
const { Schema } = mongoose;

const userAddressSchema = new Schema({
  street: String,
  zipcode: Number,
});
/* Relations Aufgabe aus Slack  */
const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    address: userAddressSchema, // one to one //
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema, "user");
