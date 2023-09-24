import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const host = "http://localhost:5000/api/v1/";
	const notesInitial = [];
	const [notes, setNotes] = useState(notesInitial);

	// Geting all Notes
	const getNote = async () => {
		const response = await fetch(`${host}note/fetchallnotes`, {
			method: "GET", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"auth-token":localStorage.getItem("token")
				},
		});
		const response2 = await fetch(`${host}auth/getuser`, {
			method: "GET", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"auth-token":localStorage.getItem("token")
			},
		});
		const data = await response.json();
		const data2 = await response2.json();
		console.log(data);
		console.log(data2.user.name)
		setNotes(data.notes)

	};

	const addNote = async ({title,description,tag}) => {
		console.log("Adding a note");
		// API Call
		const response = await fetch(`${host}note/addnote`, {
			// eslint-disable-next-line
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"auth-token":localStorage.getItem("token")
				},
			body: JSON.stringify({title,description,tag}),
		});
		const note =await response.json()
		console.log("notes: ",note)
		setNotes(notes.concat({title,description,tag}));
		console.log("finish adding note...");
	};

	// Deleting note
	const deleteNote = async (id) => {
		console.log("Deleting a note with id:" + id);
		const response = await fetch(`${host}note/deletenote/${id}`, {
			method: "DELETE", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZiNDgxNzY0Yjk1ZmZkYzY2MzZhYWUiLCJpYXQiOjE2OTQxODk3ODcsImV4cCI6MTY5Njc4MTc4N30.QLS_K7ykDzQIiOybv704W80AGMS6Qun0muW476d8hP4",
			},
		});
		const json = await response.json()
		console.log(json)
		const newNotes = notes.filter((note) => {
			const { _id: noteId } = note;
			return noteId !== id;
		});
		setNotes(newNotes);
	};

	// Editing notes
	const editNote = async (id, data) => {
		// API Call
		console.log("Editing note with id:"+id)
		const response = await fetch(`${host}note/updatingnote/${id}`, {
			method: "PATCH", // *GET, POST, PUT, DELETE, etc.
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZiNDgxNzY0Yjk1ZmZkYzY2MzZhYWUiLCJpYXQiOjE2OTQxODk3ODcsImV4cCI6MTY5Njc4MTc4N30.QLS_K7ykDzQIiOybv704W80AGMS6Qun0muW476d8hP4",
			},
			body: JSON.stringify(data),
		});
		const json = await response.json()
		console.log("editNote",json)
		const {title, description, tag}=data

		// creating a empty note to push all the note - it is not a optimise way to do
		// let note = []

		let note =JSON.parse(JSON.stringify(notes))
		// let nnote = notes
		// console.log("note: ",note);
		// console.log("nnnote: ",nnote);


		// to edit in clint side
		for (let index = 0; index < note.length; index++) {
			const element = note[index];
			
			if (element._id === id) {
				note[index].title = title;
				note[index].description = description;
				note[index].tag = tag;
				break
			}
			// we are pushin here but we need to comment out the break statement to work
			// note.push(element)
			
		}
		setNotes(note)
	};

	return (
		<NoteContext.Provider
			value={{ notes, setNotes, addNote, deleteNote, editNote, getNote,alert }}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
