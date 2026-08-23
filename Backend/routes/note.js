const express = require("express");
const {note} = require("../controllers");
const authMiddleware = require("../middlewares/auth");
const noteValidate = require("../middlewares/noteValidate");
const noteRouter = express.Router();

noteRouter.use(authMiddleware)

noteRouter.route("/").get(note.getNotes).post(noteValidate, note.createNote);
noteRouter.route("/:id").get(note.getNote).patch(noteValidate, note.editNote).delete(note.delNote);

module.exports = noteRouter;
