import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		cpassword: "",
	});
	let history = useHistory();

	const handledSubmit = async (e) => {
		e.preventDefault();
		console.log(credentials.password, credentials.cpassword);
		if (credentials.password !== credentials.cpassword) {
			return props.showAlert("Confirm password dose not match ", "danger");
		}
		const response = await fetch(
			"http://localhost:5000/api/v1/auth/createuser",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: credentials.name,
					email: credentials.email,
					password: credentials.password,
				}),
			}
		);
		const json = await response.json();
		console.log(json);
		if (json.success) {
			localStorage.setItem("token", json.token);
			history.push("/");
		} else {
			props.showAlert("Invalid details",'danger');
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	return (
		<div className='container'>
			<form onSubmit={handledSubmit}>
				<div className='mb-3'>
					<label htmlFor='name' className='form-label'>
						Name
					</label>
					<input
						type='text'
						className='form-control'
						id='name'
						aria-describedby='emailHelp'
						name='name'
						onChange={onChange}
						minLength={3}
						required
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='email' className='form-label'>
						Email address
					</label>
					<input
						type='email'
						className='form-control'
						id='email'
						aria-describedby='emailHelp'
						name='email'
						onChange={onChange}
						required
					/>
					<div id='emailHelp' className='form-text'>
						We'll never share your email with anyone else.
					</div>
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						type='password'
						className='form-control'
						id='password'
						name='password'
						onChange={onChange}
						minLength={6}
						required
					/>
				</div>
				<div className='mb-3'>
					<label htmlFor='cpassword' className='form-label'>
						Conform Password
					</label>
					<input
						type='password'
						className='form-control'
						id='cpassword'
						name='cpassword'
						onChange={onChange}
					/>
				</div>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Signup;
