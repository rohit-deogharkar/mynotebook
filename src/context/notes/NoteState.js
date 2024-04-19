import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:3001";
  const initalnotes = [];
  const [notes, setNotes] = useState(initalnotes);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //Add note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    console.log("Adding a new note")

    const note = await response.json()
    setNotes(notes.concat(note))
  };

  //Delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNote);
  };

  //Edit note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const newNote = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNote.length; index++) {
      const element = notes[index];
      if(element._id === id){
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
      
    }

    const json = await response.json()
    console.log(json)
    setNotes(newNote)
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
