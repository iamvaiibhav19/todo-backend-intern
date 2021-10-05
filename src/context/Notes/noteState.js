import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6158b46e4f845259b52128a6",
      user: "61587aaa0e54e0758c3a4b2c",
      title: "My title updated",
      description: "Wake up early friend! :updated",
      tag: "Personal",
      date: "2021-10-02T19:35:10.127Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
