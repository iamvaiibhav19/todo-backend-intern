import React, { useContext, useState } from "react";
import noteContext from "../context/Notes/noteContext";
import styled from "styled-components";

const Divv = styled.div`
  background-color: #67809f;
  width: 40%;
  position: absolute;
  right: 900px;

  height: 88vh;
  bottom: 51px;
`;

const Div = styled.div`
  display: block;
  border: 3px solid #f7ca18;
  width: 40%;
  /* position: relative;
  right: 85px;
  top: 40px; */
  /* margin: auto; */
  height: 480px;
  font-size: 1.2rem;
  background-color: #f7ca18;
`;

const Div2 = styled.div`
  width: 90%;
  margin: auto;
  color: white;
`;

const Heading = styled.h1`
  /* font-family: "Italianno", cursive; */
  color: white;
  text-align: center;
  margin-top: 35px;
  font-size: 2.2rem;
  /* border-left: 5px solid #f0a500; */
`;

const Button = styled.button`
  background-color: #00b16a;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 12px;
  margin-left: 25px;
  width: 90%;
  border: none;
  &:hover {
    background-color: #1e824c;
  }
`;

const P = styled.p`
  font-size: 1rem;
`;

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Div>
        <Heading>Add a note</Heading>
        <form>
          <Div2 className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
              minLength={5}
              required
            />
          </Div2>
          <Div2 className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </Div2>
          <Div2 className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              minLength={5}
              required
            />
          </Div2>

          <Button
            // disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            onClick={handleClick}
          >
            Add Note
          </Button>
        </form>
      </Div>
    </>
  );
};

export default AddNote;
