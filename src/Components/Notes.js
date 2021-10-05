import React, { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;

  return (
    <>
      <div className="row my-3">
        <h2>Your notes</h2>
        {notes.map((note) => {
          return <NoteItem note={note}></NoteItem>;
        })}
      </div>
    </>
  );
};

export default Notes;
