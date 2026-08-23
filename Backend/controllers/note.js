const { StatusCodes } = require("http-status-codes");
const Note = require("../models/note");
const { NotFound } = require("../errors");
const sendSuccess = (res, data, status = StatusCodes.OK) =>
  res.status(status).json({ success: true, data });

const getNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (!note) {
    throw new NotFound("No Note Found By This Id");
  }
  sendSuccess(res, note);
};

const getNotes = async (req, res) => {
  let { page = 1 } = req.query;
  const createdBy = req.user.userId;
  page = Number(page);
  const limit = 20;
  const skip = (page - 1) * limit;
  const notes = await Note.find({ createdBy }).skip(skip).limit(limit);
  sendSuccess(res, notes);
};

const createNote = async (req, res) => {
  const { title, body } = req.body;
  const createdBy = req.user.userId;
  const note = await Note.create({ title, body, createdBy });
  sendSuccess(res, note, StatusCodes.CREATED);
};

const editNote = async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;
  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { title, body },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updatedNote) {
    throw new NotFound("No Note Found By This Id");
  }
  sendSuccess(res, updatedNote);
};

const delNote = async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Note.findByIdAndDelete(id);
  if (!deletedNote) {
    throw new NotFound("No Note Found By This Id");
  }
  sendSuccess(res, deletedNote);
};

module.exports = {
  getNote,
  getNotes,
  createNote,
  editNote,
  delNote,
};
