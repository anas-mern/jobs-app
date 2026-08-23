const express = require("express");
const { auth } = require("../controllers");
const {
  registerValidate,
  loginValidate,
} = require("../middlewares/authValidate");
const AuthRouter = express.Router();

AuthRouter.route("/login").post(loginValidate, auth.login);
AuthRouter.route("/register").post(registerValidate, auth.register);
AuthRouter.route("/me").get(auth.me)
module.exports = AuthRouter;
