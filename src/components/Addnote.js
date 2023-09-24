import React,{ useState, useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
	const context = useContext(noteContext)
	const {addNote} = context
	const [note,setNote] = useState({title:'',description:'',tag:''})
	const handleClick = (e) => {
		e.preventDefault()
		addNote(note)
	}
	const onChange = (e) => {
		setNote({...note,[e.target.name]:e.target.value})
	}
	return (
		<div className='container'>
			<h1>Add a Note</h1>
			<form>
				<div className='mb-3'>
					<label htmlFor='title' className='form-label'>
						Title
					</label>
					<input
						type="text"
						className='form-control'
						id='title'
						name="title"
						onChange={onChange}
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
						id='description'
						name="description"
						onChange={onChange}
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
						id='tag'
						name="tag"
						onChange={onChange}
						required={true}
					/>
				</div>
				<button className='btn btn-primary' onClick={handleClick}>add note</button>
			</form>
		</div>
	);
};

export default Addnote;
