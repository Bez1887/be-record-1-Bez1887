const User = require("../models/User");

/* wir holen uns alle User */

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("this User does not exist");
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new Error("can not delete what is not there");
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    if (!user) throw new Error("can not update");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
};
