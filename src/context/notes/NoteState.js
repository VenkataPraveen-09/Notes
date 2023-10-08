
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host ="http://localhost:3001"

const notesInitial=
    []
      const[notes,setNotes]= useState(notesInitial)
      //get all notes
      const getNotes=async()=>{
        //Add a note
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
          });
          const json=await response.json()
        console.log(json);
        setNotes(json)

      }
      

      const addNote=async(title,description,tag)=>{
        //Add a note
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
          });
          const note=await response.json();
        setNotes(notes.concat(note))
      }


      //Delete a note
      const deleteNote=async(id)=>{
        //TODO API call 
        const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
          method: 'DELETE',
              headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              }
            });
            const json=response.json();
            console.log(json);
        console.log("Deleting the node with id "+id)
        const newNotes=notes.filter((note)=>{
          return note._id!==id
        })
        setNotes(newNotes);
      }


      //Edit a note
      const editNote=async(id,title,description,tag)=>{
        //API call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
              headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
              body: JSON.stringify({ title, description, tag })
            });
            const json=await response.json();
            console.log(json);
            let newNotes=JSON.parse(JSON.stringify(notes))
        //Logic to edit
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
          }
        }
        console.log(notes);
        setNotes(newNotes);
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;