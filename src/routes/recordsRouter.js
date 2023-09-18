const express = require("express");
const router = express.Router();

const {
  getRecords,
  getRecord,
  deleteRecord,
  addRecord,
  updateRecord,
} = require("../controller/recordsController");

router.route("/").get(getRecords).post(addRecord);

router.route("/:id").get(getRecord).put(updateRecord).delete(deleteRecord);

module.exports = router;
