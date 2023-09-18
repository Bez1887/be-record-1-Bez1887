require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
//////////////////////////////////////

/* IMPORTS */

const recordsRouter = require("./routes/recordsRouter");
const ordersRouter = require("./routes/ordersRouter");

/* 
const usersRouter = require("./routes/usersRouter");  */
/////

const { corsMiddleware } = require("./middleware/corsMiddleware");

const port = process.env.PORT || 3000;

const app = express();

/* Connection zur Datenbank */
/* aus zeile 7 verwenden */

const datenbank = mongoose
  .connect("mongodb://localhost:27017/recordshop")
  .then(() => console.log("connected to MongoDB"))
  .catch((err) =>
    console.log("error connecting to db", { message: err.message })
  );

/* Middleware nutzen */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

////////////////////////////////

/* Verwendung von den Routen */

app.use("/records", recordsRouter);
/* app.use("/users", usersRouter); */

app.use("/orders", ordersRouter);

/* Error handler */

app.use((req, res, next) => {
  const error = new Error("F*** fehler, konzentrier dich");
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    error: { message: err.message },
  });
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
