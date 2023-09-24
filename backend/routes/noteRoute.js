const express = require("express");
const router = express.Router();
const { fetchuser } = require("../middleware/fetchuser");
const Note = require("../models/notesSchema");
const { body, validationResult } = require("express-validator");

// ROUTE 1: GET all the note
router.get("/fetchallnotes",fetchuser, async (req, res) => {
	console.log(req.user)
	const notes = await Note.find({ user: req.user.userId });
	res.status(200).json({ nbHites: notes.length, notes });
});

// ROUTE 2: Adding notes
router.post(
	"/addnote",
	fetchuser,
	[body("title", "title must me atlest 3 characters").isLength({ min: 3 })],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		console.log("body: ",req.body)
		console.log(req)
		try {
			// creating a note
			const { title, description, tag } = req.body;
			const note = await Note.create({
				title,
				description,
				tag,
				user: req.user.userId,
			});
			res.status(201).json({ note });
		} catch (error) {
			console.log(error.message);
			res.status(500).json({ errro: "Some error occurred addnote" });
		}
	}
);

// ROUTE 3: Adding notes
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
	try {
		// deleting a note
		const {
			user: { userId },
			params: { id: noteId },
		} = req;
		const note = await Note.findOneAndRemove({ _id: noteId, user: userId });
		if (!note) {
			return res.status(404).json({ errro: `No note with id: ${noteId}` });
		}
		res.status(200).json({ note });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ errro: "Some error occurred addnote" });
	}
});

// ROUTE 4: Updating notes
router.patch("/updatingnote/:id", fetchuser, async (req, res) => {
	//                   ----------- my code -----------
	// (((but in this code if we give a wrong params id the error occure, need to fix this))) 
	// try {
	// 	const {
	// 		body: { title, description, tag },
	// 		user: { userId },
	// 		params: { id: noteId },
	// 	} = req;

	// 	if(title === '' || description === '' || tag === '') {
	// 		return res.status(500).json({ errro: "Please fill all the field" });
	// 	}

	// 	const note = await Note.findOneAndUpdate(
	// 		{ _id: noteId, user: userId },
	// 		{ title, description, tag },
	// 		{ new: true, runvalidators: true }
	// 	);

	// 	if (!note) {
	// 		return res.status(404).json({ errro: `No note with id: ${noteId}` });
	// 	}

	// 	res.status(200).json({ note });

	// } catch (error) {
	// 	console.log(error.message);
	// 	res.status(500).json({ errro: "Some error occurred addnote" });
	// }

	// ------------- harryis code -------------
	// same error occure in here also
	try {		
		const {
			body: { title, description, tag },
			params: { id: noteId },
			user: { userId },
		} = req;
		const newNote = {};
		if (title) {
			newNote.title = title;
		}
		if (description) {
			newNote.description = description;
		}
		if (tag) {
			newNote.tag = tag;
		}
	
		let note = await Note.findById(noteId)
		if(!note){
			return res.status(404).send(`no note with id: ${noteId}`);
		}
		if(note.user.toString() !== userId){
			return res.status(401).send('note allowed')
		}
		note = await Note.findByIdAndUpdate(noteId,{$set:newNote},{new:true,runvalidators:true});
		res.status(200).json(note)
	} catch (error) {
		console.log(error.message)
	}
});

module.exports = router;
