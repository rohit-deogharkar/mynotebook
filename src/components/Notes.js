import React, { useEffect } from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import Noteitems from "./Noteitems";
import AddNote from "./AddNote";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null)

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id: currentnote._id, etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag})
  };

  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Updating note", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click() 
    props.showAlert('Updated suiicessfully','success') 
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="exampleInputEmail1">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="t"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter Title"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5} required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="desc"
                    name="edescription"
                    placeholder="Description"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5} required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="exampleInputPassword1">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="etag"
                    placeholder="tag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary" onClick={handleSubmit}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your notes</h2>
        <div className="container mx-2">
        {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitems updateNote={updateNote} showAlert={props.showAlert} key={note._id} note={note} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
