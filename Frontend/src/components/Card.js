import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiLinkv1 from "../apiLink";

export default function Card({ note, notes, setNotes }) {
  const deleteNote = async () => {
    await axios.delete(`${apiLinkv1}/notes/${note._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setNotes(notes.filter((j) => j._id !== note._id));
  };
  console.log(note);
  const navigate = useNavigate();
  return (
    <div className="card p-3 bg-black text-white mt-2">
      <h3 className="text-center border-bottom py-3 mb-3">{note.title}</h3>
      <p className="p-0 note-body">{note.body}</p>

      <div className="d-flex justify-content-around align-items-center py-2">
        <div className="d-flex gap-3 align-items-center">
          <Button
            variant="secondary"
            onClick={() => navigate(`edit-note/${note._id}`)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button variant="danger" onClick={deleteNote}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
        <p className="m-0 fst-italic text-secondary">
          {note.createdAt.split("T")[0]}
        </p>
      </div>
    </div>
  );
}
