import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function JobForm({ type, jobs, setJobs }) {
  const [status, setStatus] = useState("interview");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const id = window.location.href.split("/")[4];
  const submit = async (e) => {
    e.preventDefault();
    try {
      const body = { company, position, status };
      let res;
      if (type === "Create") {
        res = await axios.post(`http://localhost:5000/api/v1/jobs/`, body, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(res);
        setJobs([...jobs, res.data.data]);
      } else if (type === "Edit") {
        res = await axios.patch(
          `http://localhost:5000/api/v1/jobs/${id}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      console.log(res);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mt-5">
      <div className="soft-shadow h-50 m-auto w-50">
        <h1 className="text-center mb-4">{type}</h1>
        <Form onSubmit={submit}>
          <Form.Group className="d-flex gap-3 align-items-center mb-3">
            <Form.Label className="w-35">company</Form.Label>
            <Form.Control
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="d-flex gap-3 align-items-center mb-3">
            <Form.Label className="w-35">Position</Form.Label>
            <Form.Control
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {type === "Edit" ? (
            <Form.Group className="d-flex gap-3 align-items-center mb-3">
              <Form.Label className="w-35">Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="interview">Interview</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
              </Form.Select>
            </Form.Group>
          ) : (
            ""
          )}
          <Button variant="primary" className="mb-3" type="submit">
            {type}
          </Button>
        </Form>
      </div>
    </div>
  );
}
