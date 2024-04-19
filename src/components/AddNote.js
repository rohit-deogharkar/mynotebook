import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "",
    description: "",
    tag: ""})
    props.showAlert('Note added successfully', 'success')
  };
  return (
    <div className="container my-3">
      <h2>Add a note</h2>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            className="form-control"
            id="t"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            onChange={onChange}
            value={note.title}
            minLength={5}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputPassword1">Description</label>
          <input
            type="text"
            className="form-control"
            id="desc"
            name="description"
            placeholder="Description"
            onChange={onChange}
            value={note.description}
            minLength={5}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="exampleInputPassword1">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="tag"
            onChange={onChange}
            value={note.tag}
            minLength={5}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={note.title.length<5 || note.description.length<5}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
