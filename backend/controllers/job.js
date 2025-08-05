const { StatusCodes } = require("http-status-codes");
const Job = require("../models/job");
const { NotFound } = require("../errors");
const sendSuccess = (res, data, status = StatusCodes.OK) =>
  res.status(status).json({ success: true, data });

const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new NotFound("No Job Found By This Id");
  }
  sendSuccess(res, job);
};

const getJobs = async (req, res) => {
  let { page = 1 } = req.query;
  page = Number(page);
  const limit = 20;
  const skip = (page - 1) * limit;
  const jobs = await Job.find().skip(skip).limit(limit);
  sendSuccess(res, jobs);
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  const createdBy  = req.user.userId;
  const job = await Job.create({ company, position, createdBy });
  sendSuccess(res, job, StatusCodes.CREATED);
};

const editJob = async (req, res) => {
  const { company, position, status } = req.body;
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(
    id,
    { company, position, status },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedJob) {
    throw new NotFound("No Job Found By This Id");
  }
  sendSuccess(res, updatedJob);
};

const delJob = async (req, res) => {
  const { id } = req.params;
  const deletedJob = await Job.findByIdAndDelete(id);
  if (!deletedJob) {
    throw new NotFound("No Job Found By This Id");
  }
  sendSuccess(res, deletedJob);
};

module.exports = {
  getJob,
  getJobs,
  createJob,
  editJob,
  delJob,
};
