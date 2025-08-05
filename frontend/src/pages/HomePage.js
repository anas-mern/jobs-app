import axios from "axios";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import JobForm from "../components/JobForm";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getJobs = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(res.data.data);
    };
    getJobs();
  },[]);
  return (
    <div>
      <NavBar />
      <JobForm type="Create" jobs={jobs} setJobs={setJobs} />
      <div className="d-flex w-75 m-auto mt-4 flex-wrap cards">
        {jobs.map((j) => (
          <Card key={j._id} job={j} jobs={jobs} setJobs={setJobs} />
        ))}
      </div>
    </div>
  );
}
