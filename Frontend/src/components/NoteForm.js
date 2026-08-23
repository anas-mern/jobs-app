import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiLinkv1 from "../apiLink";

export default function NoteForm({ type, notes, setNotes }) {
  const [title, setTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const navigate = useNavigate();
  const id = window.location.href.split("/").at(-1);
  const textareaRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const body = { title, body: noteBody };
      let res;
      if (type === "Create") {
        res = await axios.post(`${apiLinkv1}/notes`, body, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(res);
        setNotes([...notes, res.data.data]);
      } else if (type === "Edit") {
        res = await axios.patch(
          `${apiLinkv1}/notes/${id}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        navigate("/");
      }
      console.log(res);
      setTitle("");
      setNoteBody("");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getNote = async () => {
      if (type === "Edit") {
        const res = await axios.get(
          `${apiLinkv1}/notes/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setTitle(res.data.data.title);
        setNoteBody(res.data.data.body);
      }
    };
    getNote();
  }, [type, id]);

  useEffect(() => {
    const ta = textareaRef.current;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [noteBody]);

  return (
    <div className="mt-5">
      <div className="p-4 bg-black text-white soft-shadow m-auto w-50 rounded-4 form-container">
        <h1 className="text-center mb-4">{type}</h1>
        <Form onSubmit={submit}>
          <Form.Group className="d-flex gap-3 align-items-center mb-3">
            <Form.Label className="w-35">Title</Form.Label>
            <Form.Control
              className="bg-special text-white"
              type="text"
              minLength={5}
              maxLength={30}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="d-flex gap-3 align-items-center mb-3">
            <Form.Label className="w-35">Body</Form.Label>
            <textarea
              ref={textareaRef}
              onChange={(e) => setNoteBody(e.target.value)}
              className="bg-special text-white form-control"
              minLength={10}
              maxLength={300}
              rows={1}
              value={noteBody}
            ></textarea>
          </Form.Group>
          <Button
            className="mb-3 bg-special text-white"
            variant="none"
            type="submit"
          >
            {type}
          </Button>
        </Form>
      </div>
    </div>
  );
}
