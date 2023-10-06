
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{

const notesInitial=
    [
        
        {
          "_id": "651ec694553217eeb0720686",
          "user": "651e86762421c756fa2179d7",
          "title": "Lovestory",
          "description": "This is under testing",
          "tag": "Lovers",
          "date": "2023-10-05T14:22:12.325Z",
          "__v": 0
        },
        {
          "_id": "651ece3cc14395f459a932",
          "user": "651e86762421c756fa2179d7",
          "title": "Lovestory24",
          "description": "This is under testing",
          "tag": "Lovers",
          "date": "2023-10-05T14:54:52.605Z",
          "__v": 0
        },
        {
          "_id": "651ecec14395f9c334",
          "user": "651e86762421c756fa2179d7",
          "title": "Lovestory24",
          "description": "This is under testing",
          "tag": "Lovers",
          "date": "2023-10-05T14:54:52.605Z",
          "__v": 0
        },
        {
          "_id": "651ece3cc14395f9c335",
          "user": "651e86762421c756fa2179d7",
          "title": "Lovestory24",
          "description": "This is under testing",
          "tag": "Lovers",
          "date": "2023-10-05T14:54:52.605Z",
          "__v": 0
        }
      ]
      const[notes,setNotes]= useState(notesInitial)

      //Add a note
      const addNote=(title,description,tag)=>{
        //To do api call
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
      const deleteNote=(id)=>{
        //TODO API call 
        console.log("Deleting the node with id "+id)
        const newNotes=notes.filter((note)=>{
          return note._id!==id
        })
        setNotes(newNotes);
      }
      //Edit a note
      const editNote=(id,title,description,tag)=>{

      }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;