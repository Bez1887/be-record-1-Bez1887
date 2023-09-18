/* 3 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    quantity: Number,
    records: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Record",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema, "order");
