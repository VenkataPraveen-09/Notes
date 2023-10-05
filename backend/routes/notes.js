const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//1. Get all the notes Using GET Login requried
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some thing is wrong");
  }
});

//2. Add notes Using GET Login requried
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors , return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some thing is wrong");
    }
  }
);

//3. Update notes Using PUT Login requried
router.put(
    '/updatenote/:id',
    fetchuser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        // new note object creation
        try {
            
        
        const newNote={};
        if (title) {
            newNote.title = title;
          }
          if (description) {
            newNote.description = description;
          }
          if (tag) {
            newNote.tag = tag;
          }

        //Finding the note to be updated 
        let note=await Note.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found")}
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, newNote, { new: true });
            res.json({note});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some thing is wrong");
          }
    });



// 4. Delete the existing notes
router.delete(
    '/deletenode/:id',
    fetchuser,
    async (req, res) => {
        try {
            
        
        // new note object creation
        const newNote={};
        if (title) {
            newNote.title = title;
          }
          if (description) {
            newNote.description = description;
          }
          if (tag) {
            newNote.tag = tag;
          }

        //Finding the note to be deleted 
        let note=await Note.findById(req.params.id);
        if(!note){ return res.status(404).send("Not Found")}
        //allow deletion only if the user owns this note
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
            res.json({"Success":"Note has been deleted ",note:note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some thing is wrong");
          }
    });
module.exports = router;
