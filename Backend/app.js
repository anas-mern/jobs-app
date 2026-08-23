const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const limitter = require('express-rate-limit');
const sanitize = require('express-mongo-sanitize');
require("dotenv").config();
require("express-async-errors");
//Builtin Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(sanitize())
app.use(limitter({
  windowMs: 15 * 60 * 1000,
  max : 100
}))
//Routes
const { NoteRouter, AuthRouter } = require("./routes");
app.use("/api/v1/notes", NoteRouter);
app.use("/api/v1/auth", AuthRouter);

//Error Handling
const errorHandle = require("./middlewares/error-handle");
const notFound = require("./middlewares/not-found");
app.use(notFound);
app.use(errorHandle);

//start
const connect_DB = require("./connections/db");
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connect_DB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
};

start();
