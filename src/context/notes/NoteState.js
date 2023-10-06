
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
        },
        {
          "_id": "651ece3cc14395f459a9c",
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
      const addNode=()=>{

      }
      //Delete a note
      const deleteNode=(id)=>{

      }
      //Edit a note
      const editNode=(id)=>{

      }
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;