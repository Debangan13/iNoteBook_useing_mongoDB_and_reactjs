import React from "react";
// CLS -> Cumulative Layout Shift
export default function Alert(props) {
	console.log(props.alert)
	return (
		<div style={{height: '50px'}} >
			{props.alert && (
				<div
					className={`alert alert-${props.alert.type} alert-dismissible fade show`}
					role='alert'
				>
					{props.alert.msg}
					<button
						type='button'
						className='btn-close'
						data-bs-dismiss='alert'
						aria-label='Close'
					></button>
				</div>
			)}
		</div>
	);
}
