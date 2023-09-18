const express = require("express");
const router = express.Router();

// wir importieren die validierung

const userValidation = require("../validations/userValidation");

/* const {
  getUser,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} = require("../controller/usersController"); */ // ist ein eigener Import

const userController = require("../controller/usersController");

router
  .route("/")
  .get(userController.getUsers)
  .post(
    userValidation.password,
    userValidation.username,
    userController.addUser
  );

router
  .route("/:id")
  .get(userController.getUser)

  .put(
    userValidation.password,
    userValidation.username,
    userValidation.updateUser
  )
  .delete(userController.deleteUser);

module.exports = router;
