import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Card({ job,jobs,setJobs }) {
  const deleteJob = async () => {
    await axios.delete(`http://localhost:5000/api/v1/jobs/${job._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setJobs(jobs.filter(j=>j._id!==job._id))
  };
  const navigate = useNavigate()
  return (
    <div className="card p-3 bg-success-subtle mt-2">
      <h3>{job.company}</h3>
      <h6>{job.position}</h6>
      <div className="d-flex gap-3 align-items-center">
        <p className="m-0">{job.status}</p>
        <Button variant="secondary" onClick={()=>navigate(`edit-job/${job._id}`)}>Edit</Button>
        <Button variant="danger" onClick={deleteJob}>
          Delete
        </Button>
      </div>
    </div>
  );
}
