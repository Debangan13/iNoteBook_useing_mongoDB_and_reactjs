import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

export default function Navbar() {
	let location = useLocation();
	// useEffect(()=> {
	//   let loc = location.pathname;
	//   console.log(loc)
	// })
	let history = useHistory();

	const handledClick = () => {
		localStorage.removeItem('token');
		history.push("/login");
	};
	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<div className='container-fluid'>
					<Link className='navbar-brand' to='/'>
						Navbar
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<Link
									className={`nav-link ${
										location.pathname === "/" ? "active" : ""
									}`}
									aria-current='page'
									to='/'
								>
									Home
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									className={`nav-link ${
										location.pathname === "/about" ? "active" : ""
									}`}
									to='/about'
								>
									about
								</Link>
							</li>
						</ul>
						{!localStorage.getItem("token") ? (
							<form className='d-flex' role='search'>
								<Link
									className='btn btn-primary mx-3'
									to='/login'
									type='submit'
								>
									Login
								</Link>
								<Link className='btn btn-primary' to='/signup' type='submit'>
									Signup
								</Link>
							</form>
						) : (
							<button className='btn btn-primary' onClick={handledClick}>
								Logout
							</button>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}
