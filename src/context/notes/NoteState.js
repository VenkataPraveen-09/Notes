
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
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZTg2NzYyNDIxYzc1NmZhMjE3OWQ3In0sImlhdCI6MTY5NjUwMDU4OH0.bSKjU8i4Soe11AJ9kJz8KhPaQ0H5hpn6hYHgtdtA73o"
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
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZTg2NzYyNDIxYzc1NmZhMjE3OWQ3In0sImlhdCI6MTY5NjUwMDU4OH0.bSKjU8i4Soe11AJ9kJz8KhPaQ0H5hpn6hYHgtdtA73o"
            },
            body: JSON.stringify({title,description,tag})
          });
        console.log("Adding a new node");
        const note=
          {
            "_id": "651ece3cc14395f459a9c",
            "user": "651e86762421c756fa2179d7",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-10-05T14:54:52.605Z",
            "__v": 0
          }
        setNotes(notes.concat(note))
      }


      //Delete a note
      const deleteNote=async(id)=>{
        //TODO API call 
        const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
          method: 'DELETE',
              headers: {
                "Content-Type": "application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZTg2NzYyNDIxYzc1NmZhMjE3OWQ3In0sImlhdCI6MTY5NjUwMDU4OH0.bSKjU8i4Soe11AJ9kJz8KhPaQ0H5hpn6hYHgtdtA73o"
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
          method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZTg2NzYyNDIxYzc1NmZhMjE3OWQ3In0sImlhdCI6MTY5NjUwMDU4OH0.bSKjU8i4Soe11AJ9kJz8KhPaQ0H5hpn6hYHgtdtA73o"
              },
              body: JSON.stringify(title,description,tag)
            });
            const json=response.json();
        //Logic to edit
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id===id){
            element.title=title;
            element.description=description;
            element.tag=tag;
          }
        }
      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;