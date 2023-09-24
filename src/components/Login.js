import React, { useState } from "react";
import {useHistory} from 'react-router-dom'


const Login = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory()   

	const handledSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:5000/api/v1/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
			}),
		});
		const json = await response.json();
		console.log(json);
		if (json.name) {
			localStorage.setItem("token",json.token)
            history.push('/')
		} else {
			alert("Invalid Credentials")
		}
	};

	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};
	return (
		<div className="container">
			<form onSubmit={handledSubmit}>
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
					/>
				</div>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
