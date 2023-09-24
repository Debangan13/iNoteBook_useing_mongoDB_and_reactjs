import React, { useContext } from "react";
import "../index.css";
import noteContext from "../context/notes/noteContext";

export default function Noteitem(props) {
	const {
		note: { title, description, _id: noteId },
		note,
		updateNote		
	} = props;
	const context = useContext(noteContext);
	const { deleteNote } = context;
	return (
		<div className='col-md-3'>
			<div className='card'>
				<div className='card-body'>
					<div className='d-flex align-items-center'>
						<h5 className='card-title'>{title}</h5>
						<i
							className='fa-solid fa-trash mx-2'
							onClick={() => deleteNote(noteId)}
						/>
						<i className='fa-solid fa-pen-to-square mx-2'
						onClick={()=>updateNote(note)} 
						/>
					</div>
					<p className='card-text'>{description}</p>
				</div>
			</div>
		</div>
	);
}
