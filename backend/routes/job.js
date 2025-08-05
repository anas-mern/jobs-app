const express = require("express");
const {job} = require("../controllers");
const authMiddleware = require("../middlewares/auth");
const jobValidate = require("../middlewares/jobValidate");
const JobRouter = express.Router();

JobRouter.use(authMiddleware)

JobRouter.route("/").get(job.getJobs).post(jobValidate, job.createJob);
JobRouter.route("/:id").get(job.getJob).patch(jobValidate, job.editJob).delete(job.delJob);

module.exports = JobRouter;
