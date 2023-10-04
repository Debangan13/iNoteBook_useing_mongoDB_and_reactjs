import React, { useEffect, useRef, useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "../components/Noteitem";
import Addnote from "../components/Addnote";
import { useHistory } from "react-router-dom";

export default function Notes(props) {
	const context = useContext(noteContext);
	const { notes, getNote, editNote } = context;
	const [note, setNote] = useState({
		id: "",
		etitle: "",
		edescription: "",
		etag: "",
	});
	let history = useHistory()

	useEffect(() => {
		if(localStorage.getItem("token")){
			getNote();
		}else{
			history.push('/login')
		}

	}, []);
	const ref = useRef(null);
	const refClose = useRef(null);

	const updateNote = (currentNote) => {
		const { title, description, tag, _id } = currentNote;
		console.log("currentNote:",currentNote)
		setNote({ id: _id, etitle: title, edescription: description, etag: tag });
		ref.current.click();
		// console.log(currentNote);
	};

	const handleClick = (e) => {
		const { etitle, edescription, etag ,id} = note;
		console.log(note)
		editNote(id, { title: etitle, description: edescription, tag: etag });
		refClose.current.click();
	};
	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Addnote />
			<button
				type='button'
				className='btn btn-primary d-none'
				data-bs-toggle='modal'
				data-bs-target='#exampleModal'
				ref={ref}
			>
				Launch demo modal
			</button>

			<div
				className='modal fade'
				id='exampleModal'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1 className='modal-title fs-5' id='exampleModalLabel'>
								Edit Note
							</h1>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<form>
								<div className='mb-3'>
									<label htmlFor='title' className='form-label'>
										Title
									</label>
									<input
										type='text'
										className='form-control'
										id='etitle'
										name='etitle'
										onChange={onChange}
										value={note.etitle}
										required={true}
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='description' className='form-label'>
										Description
									</label>
									<input
										type='text'
										className='form-control'
										id='edescription'
										name='edescription'
										onChange={onChange}
										value={note.edescription}
										required={true}
									/>
								</div>
								<div className='mb-3'>
									<label htmlFor='tag' className='form-label'>
										tag
									</label>
									<input
										type='text'
										className='form-control'
										id='etag'
										name='etag'
										onChange={onChange}
										value={note.etag}
										required={true}
									/>
								</div>
							</form>
						</div>
						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
								ref={refClose}
							>
								Close
							</button>
							<button
								type='button'
								className='btn btn-primary'
								onClick={handleClick}
							>
								Update Note
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='row my-3'>
				<h1>Your Notes</h1>
				{notes.length === 0 && (
					<div className='container mx-3'>No notes to display</div>
				)}
				{notes.map((note) => {
					return (
						<Noteitem key={note._id}  note={note} updateNote={updateNote} />
					);
				})}
			</div>
		</>
	);
}
