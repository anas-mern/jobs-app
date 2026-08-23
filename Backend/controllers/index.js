const authControllers = require("./auth");
const noteControllers = require("./note");

module.exports = {
  auth: authControllers,
  note: noteControllers,
};
