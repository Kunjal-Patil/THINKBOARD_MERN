import Note from "../models/Note.js";

export async function getAllNotes(req,res) {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch(error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
 
export async function getNotes(req,res) {
    try {
        const notes = await Note.findById(req.params.id);
        res.status(200).json(notes);
    } catch(error) {
        console.error("Error in getNotes controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
 

export async function createNote(req,res) {
    try{
        const {title, content} = req.body;
        const newNote = new Note({title:title, content:content});
        await newNote.save();
        res.status(201).json({message:"Note created  succesfully"});
    } catch(error) {
        console.error("Error in createNotes controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function updateNote(req,res) {
    try{
        const {title, content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(req.params.id, {title:title, content:content}, {new:true});
        if(!updateNote) {
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({message:"Note updated succesfully"});
    } catch(error) {
        console.error("Error in updateNotes controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function deleteNote(req,res) {
    try{
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if (!deleteNote) {
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({message:"Note deleted succesfully"});
    } catch(error) {
        console.error("Error in deleteNotes controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}
