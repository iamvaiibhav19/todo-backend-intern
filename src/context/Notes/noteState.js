import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //add note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ODdhYWEwZTU0ZTA3NThjM2E0YjJjIn0sImlhdCI6MTYzMzE5MDE3Nn0.hHG9zPiVpPBjcAboLqhlP3T-qs9r1MqXmPXPNr-5SMU",
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);

    console.log("adding a note");
    const note = {
      _id: "6158b46e4f845259b52128a6",
      user: "61587aaa0e54e0758c3a4b2c",
      title: title,
      description: description,
      tag: tag,
      date: "2021-10-02T19:35:10.127Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //get all note
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ODdhYWEwZTU0ZTA3NThjM2E0YjJjIn0sImlhdCI6MTYzMzE5MDE3Nn0.hHG9zPiVpPBjcAboLqhlP3T-qs9r1MqXmPXPNr-5SMU",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //delete note
  const deleteNote = async (id) => {
    //api call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ODdhYWEwZTU0ZTA3NThjM2E0YjJjIn0sImlhdCI6MTYzMzE5MDE3Nn0.hHG9zPiVpPBjcAboLqhlP3T-qs9r1MqXmPXPNr-5SMU",
      },
    });
    const json = await response.json();
    console.log(json);

    console.log("deleting note");
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1ODdhYWEwZTU0ZTA3NThjM2E0YjJjIn0sImlhdCI6MTYzMzE5MDE3Nn0.hHG9zPiVpPBjcAboLqhlP3T-qs9r1MqXmPXPNr-5SMU",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //logic to edit on client side
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(newNotes);
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
