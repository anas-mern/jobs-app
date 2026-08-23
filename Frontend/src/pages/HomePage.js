import axios from "axios";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm";
import apiLinkv1 from "../apiLink";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get(`${apiLinkv1}/notes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(res.data.data);
    };
    getNotes();
  }, []);
  return (
    <div className="bg-dark pb-4" style={{ minHeight: "100vh" }}>
      <NavBar />
      <NoteForm type="Create" notes={notes} setNotes={setNotes} />
      <div className="d-flex w-75 m-auto mt-4 flex-wrap cards">
        {notes.map((n) => (
          <Card key={n._id} note={n} notes={notes} setNotes={setNotes} />
        ))}
      </div>
    </div>
  );
}
