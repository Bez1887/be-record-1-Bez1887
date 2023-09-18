const Record = require("../models/Record");

/* Wir holen uns alle Records */

const getRecords = async (req, res, next) => {
  try {
    const records = await Record.find();
    res.status(200).send(records);
  } catch (err) {
    next(err);
  }
};

const getRecord = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) throw new Error("this Record does not exist");
    res.status(200).send(record);
  } catch (err) {
    next(err);
  }
};

const addRecord = async (req, res, next) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.status(201).send(record);
  } catch (err) {
    next(err);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) throw new Error("can not delete what is not there");
    res.status(200).send(record);
  } catch (err) {
    next(err);
  }
};

const updateRecord = async (req, res, next) => {
  const recordId = req.params.id;
  const updatedRecord = req.body;
  try {
    const record = await Record.findByIdAndUpdate(recordId, updatedRecord, {
      new: true,
    });
    if (!record) throw new Error("can not update");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRecords,
  getRecord,
  addRecord,
  deleteRecord,
  updateRecord,
};
